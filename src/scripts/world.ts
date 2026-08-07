import type { PadKey } from '../content/types';
import type { Pad } from '../data/pads';
import { PADS, padAt, padByKey } from '../data/pads';
import { setState, state, subscribe } from './state';

const STEP = 60;
const WORLD_WIDTH = 900;
const WORLD_HEIGHT = 540;
const MAX_X = WORLD_WIDTH - STEP;
const MAX_Y = WORLD_HEIGHT - STEP;
const CHROME_HEIGHT = 216;
const VIEWPORT_MIN_HEIGHT = 300;
const WALK_INTERVAL_MS = 85;
const CONSOLE_KEY = 'console';

const DIRECTIONS: Record<string, [number, number]> = {
  up: [0, -1],
  down: [0, 1],
  left: [-1, 0],
  right: [1, 0],
};

const KEY_DIRECTIONS: Record<string, string> = {
  arrowup: 'up',
  w: 'up',
  ц: 'up',
  arrowdown: 'down',
  s: 'down',
  ы: 'down',
  arrowleft: 'left',
  a: 'left',
  ф: 'left',
  arrowright: 'right',
  d: 'right',
  в: 'right',
};

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function cameraOffset(viewport: number, world: number, position: number): number {
  if (viewport >= world) {
    return Math.round((viewport - world) / 2);
  }

  return -Math.round(clamp(position + STEP / 2 - viewport / 2, 0, world - viewport));
}

function viewportHeight(): number {
  return Math.max(VIEWPORT_MIN_HEIGHT, Math.min(WORLD_HEIGHT, window.innerHeight - CHROME_HEIGHT));
}

function flushLayout(element: HTMLElement): void {
  element.getBoundingClientRect();
}

export function stateHash(): string {
  if (state.mode === 'console') {
    return `#${CONSOLE_KEY}`;
  }

  return state.panel ? `#${state.panel}` : '';
}

export function syncHash(): void {
  history.replaceState(null, '', stateHash() || location.pathname + location.search);
}

export function initWorld(root: HTMLElement): void {
  const viewport = root.querySelector<HTMLElement>('.viewport')!;
  const hint = root.querySelector<HTMLElement>('[data-hint]')!;
  const status = root.querySelector<HTMLElement>('[data-status]')!;
  const padButtons = new Map<string, HTMLElement>();

  for (const button of root.querySelectorAll<HTMLElement>('[data-pad]')) {
    padButtons.set(button.dataset.pad!, button);
  }

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let walkTimer = 0;
  let announced: PadKey | null = null;

  function canMove(): boolean {
    return state.mode === 'map' && state.panel === null;
  }

  function announce(key: PadKey | null): void {
    if (key === announced) {
      return;
    }

    announced = key;
    status.textContent = key ? padButtons.get(key)!.dataset.announce! : '';
  }

  function render(): void {
    root.hidden = state.mode === 'console';

    if (root.hidden) {
      return;
    }

    root.style.setProperty('--viewport-height', `${viewportHeight()}px`);
    root.style.setProperty('--guy-x', `${state.x}px`);
    root.style.setProperty('--guy-y', `${state.y}px`);
    root.style.setProperty('--camera-x', `${cameraOffset(viewport.clientWidth, WORLD_WIDTH, state.x)}px`);
    root.style.setProperty('--camera-y', `${cameraOffset(viewport.clientHeight, WORLD_HEIGHT, state.y)}px`);

    const here = canMove() ? padAt(state.x, state.y) : null;

    hint.hidden = here === null;
    announce(here);
  }

  function stopWalk(): void {
    window.clearInterval(walkTimer);
    walkTimer = 0;
  }

  function openPad(key: PadKey): void {
    setState(key === CONSOLE_KEY ? { mode: 'console' } : { panel: key });
    syncHash();
  }

  function closeOverlays(): void {
    if (canMove()) {
      return;
    }

    setState({ mode: 'map', panel: null });
    syncHash();
  }

  function openHere(): void {
    const key = canMove() ? padAt(state.x, state.y) : null;

    if (key) {
      openPad(key);
    }
  }

  function step(direction: string): void {
    if (!canMove()) {
      return;
    }

    stopWalk();

    const [dx, dy] = DIRECTIONS[direction];

    setState({
      x: clamp(state.x + dx * STEP, 0, MAX_X),
      y: clamp(state.y + dy * STEP, 0, MAX_Y),
    });
  }

  function walkTo(pad: Pad): void {
    if (!canMove()) {
      return;
    }

    stopWalk();

    if (reducedMotion.matches) {
      setState({ x: pad.x, y: pad.y });
      openPad(pad.key);
      return;
    }

    walkTimer = window.setInterval(() => {
      if (state.x === pad.x && state.y === pad.y) {
        stopWalk();
        openPad(pad.key);
        return;
      }

      const dx = state.x === pad.x ? 0 : Math.sign(pad.x - state.x) * STEP;
      const dy = dx === 0 ? Math.sign(pad.y - state.y) * STEP : 0;

      setState({ x: state.x + dx, y: state.y + dy });
    }, WALK_INTERVAL_MS);
  }

  function readHash(): void {
    const key = location.hash.slice(1);

    if (key === CONSOLE_KEY) {
      setState({ mode: 'console' });
      return;
    }

    const pad = padByKey(key);

    if (pad) {
      setState({ x: pad.x, y: pad.y, panel: pad.key });
    }
  }

  for (const pad of PADS) {
    padButtons.get(pad.key)!.addEventListener('click', () => walkTo(pad));
  }

  for (const button of root.querySelectorAll<HTMLElement>('[data-move]')) {
    button.addEventListener('click', () => step(button.dataset.move!));
  }

  root.querySelector<HTMLElement>('[data-open]')!.addEventListener('click', openHere);

  window.addEventListener(
    'keydown',
    (event) => {
      if (event.key === 'Escape') {
        closeOverlays();
        return;
      }

      if (!canMove()) {
        return;
      }

      if (event.key === 'Enter') {
        if (document.activeElement instanceof HTMLButtonElement) {
          return;
        }

        event.preventDefault();
        openHere();
        return;
      }

      const direction = KEY_DIRECTIONS[event.key.toLowerCase()];

      if (!direction) {
        return;
      }

      event.preventDefault();
      step(direction);
    },
    { passive: false },
  );

  window.addEventListener('resize', render);

  subscribe(render);
  readHash();
  render();
  flushLayout(root);
  root.dataset.ready = '';
}
