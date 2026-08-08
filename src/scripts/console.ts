import type { ConsolePayload } from '../data/console';
import type { Line } from './commands';
import { commandCompletions, runCommand } from './commands';
import { createFeed } from './feed';
import { HOME_DIR, setState, state, subscribe } from './state';
import { readFound, writeFound } from './storage';
import { buildTree, pathCompletions } from './vfs';
import { stateHash, syncHash } from './world';

const LEAVE_DELAY_MS = 320;
const HOME_MARK = '~';
const ROOT_DIR = '/';
const RAIN_LINES = 18;
const RAIN_WIDTH = 44;
const RAIN_GLYPHS = '01';
const RAIN_GAP_CHANCE = 0.3;

function rainLines(): Line[] {
  return Array.from({ length: RAIN_LINES }, (): Line => {
    let text = '';

    while (text.length < RAIN_WIDTH) {
      text += Math.random() < RAIN_GAP_CHANCE ? ' ' : RAIN_GLYPHS[Math.floor(Math.random() * RAIN_GLYPHS.length)];
    }

    return { kind: 'dim', text };
  });
}

function promptPath(cwd: string): string {
  if (cwd === HOME_DIR) {
    return HOME_MARK;
  }

  return cwd === ROOT_DIR ? ROOT_DIR : cwd.slice(cwd.lastIndexOf('/') + 1);
}

function commonPrefix(values: string[]): string {
  return values.reduce((prefix, value) => {
    let length = 0;

    while (length < prefix.length && length < value.length && prefix[length] === value[length]) {
      length += 1;
    }

    return prefix.slice(0, length);
  });
}

export function initConsole(root: HTMLElement): void {
  const data: ConsolePayload = JSON.parse(root.querySelector('[data-payload]')!.textContent!);
  const feed = createFeed(
    root.querySelector<HTMLElement>('[data-feed]')!,
    root.querySelector<HTMLElement>('[data-screen]')!,
    root.querySelector<HTMLElement>('.prompt')!,
  );
  const input = root.querySelector<HTMLInputElement>('[data-input]')!;
  const path = root.querySelector<HTMLElement>('.prompt-path')!;
  const toMapButtons = document.querySelectorAll<HTMLElement>('[data-to-map]');
  const strings = data.strings;
  const total = data.files.filter((file) => file.secret).length + data.secrets.length;
  const pointer = window.matchMedia('(hover: hover)');
  const history: string[] = [];

  setState({ found: readFound() });

  let tree = buildTree(data.files.filter((file) => !file.reward || state.found.length >= total));
  let historyIndex = 0;

  function foundText(count: number): string {
    const counter = `${strings.secrets.found}: ${count}/${total}`;

    return count === 1 ? `${counter} · ${strings.secrets.hint}` : counter;
  }

  function register(id: string): void {
    if (state.found.includes(id)) {
      return;
    }

    const found = [...state.found, id];

    setState({ found });
    writeFound(found);
    feed.print([{ kind: 'dim', text: foundText(found.length) }]);

    if (found.length >= total) {
      tree = buildTree(data.files);
      feed.print([{ kind: 'dim', text: strings.secrets.complete }]);
    }
  }

  async function play(): Promise<void> {
    const { run } = await import('./game');
    const result = await run(root, strings.game);

    feed.print([
      { kind: 'dim', text: `${strings.game.score}: ${result.score} · ${strings.game.best}: ${result.best}` },
    ]);
    sync();
  }

  function leave(result: { toMap?: boolean; href?: string }): void {
    window.setTimeout(() => {
      if (result.href) {
        location.href = result.href;
        return;
      }

      setState({ mode: 'map' });
      syncHash();
    }, LEAVE_DELAY_MS);
  }

  function execute(value: string): void {
    const command = value.trim();

    if (!command) {
      return;
    }

    history.push(command);
    historyIndex = history.length;
    feed.print([{ kind: 'cmd', text: command }]);

    const result = runCommand(command, {
      data,
      tree,
      cwd: state.cwd,
      found: state.found,
      total,
      links: { resume: root.dataset.resume!, lang: `${root.dataset.lang}${stateHash()}` },
    });

    if (result.clear) {
      feed.clear();
    }

    if (result.cwd) {
      setState({ cwd: result.cwd });
    }

    if (result.rain) {
      feed.print(rainLines());
    }

    feed.print(result.lines);

    if (result.found) {
      register(result.found);
    }

    if (result.program) {
      play();
    }

    if (result.toMap || result.href) {
      leave(result);
    }
  }

  function complete(): void {
    const value = input.value;
    const cut = value.lastIndexOf(' ');
    const token = value.slice(cut + 1);
    const candidates = cut === -1 ? commandCompletions(token, state.found) : pathCompletions(tree, state.cwd, token);

    if (candidates.length === 0) {
      return;
    }

    const shared = commonPrefix(candidates);

    if (shared.length > token.length) {
      input.value = value.slice(0, cut + 1) + shared;
      return;
    }

    if (candidates.length > 1) {
      feed.print([{ kind: 'dim', text: candidates.join('  ') }]);
    }
  }

  function recall(step: number): void {
    historyIndex = Math.max(0, Math.min(history.length, historyIndex + step));
    input.value = history[historyIndex] ?? '';
  }

  function sync(): void {
    const active = state.mode === 'console';

    path.textContent = promptPath(state.cwd);
    root.hidden = !active;

    for (const button of toMapButtons) {
      button.hidden = !active;
    }

    if (active && pointer.matches) {
      input.focus({ preventScroll: true });
    }
  }

  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      const value = input.value;

      input.value = '';
      execute(value);
      return;
    }

    if (event.key === 'Tab') {
      event.preventDefault();
      complete();
      return;
    }

    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault();
      recall(event.key === 'ArrowUp' ? -1 : 1);
      return;
    }

    if (event.ctrlKey && event.key.toLowerCase() === 'l') {
      event.preventDefault();
      feed.clear();
    }
  });

  root.addEventListener('click', (event) => {
    const target = event.target;

    if (!(target instanceof HTMLElement)) {
      return;
    }

    const button = target.closest<HTMLButtonElement>('[data-command]');

    if (button) {
      execute(button.dataset.command!);
    }

    if (!(target instanceof HTMLAnchorElement)) {
      input.focus({ preventScroll: true });
    }
  });

  for (const button of toMapButtons) {
    button.addEventListener('click', () => {
      setState({ mode: 'map' });
      syncHash();
    });
  }

  subscribe(sync);
  sync();
}
