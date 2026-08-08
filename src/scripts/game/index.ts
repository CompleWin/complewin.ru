import type { GameStrings } from '../../content/types';
import { state, subscribe } from '../state';
import { readBest, writeBest } from '../storage';
import { createGame, update } from './game';
import { createInput } from './input';
import { HEIGHT, WIDTH } from './model';
import { createRenderer } from './render';
import '../../styles/game.css';

const STEP_MS = 1000 / 60;
const MAX_CATCH_UP = 5;
const KEY_GLYPHS = { left: '←', right: '→' };

export interface Result {
  score: number;
  best: number;
}

function button(className: string, label: string, action: string): HTMLButtonElement {
  const element = document.createElement('button');

  element.type = 'button';
  element.className = className;
  element.textContent = label;
  element.dataset.action = action;

  return element;
}

function box(className: string): HTMLElement {
  const element = document.createElement('div');

  element.className = className;

  return element;
}

function key(action: 'left' | 'right'): HTMLButtonElement {
  const element = button('dpad-key', KEY_GLYPHS[action], action);

  element.setAttribute('aria-label', action);

  return element;
}

function view(strings: GameStrings): HTMLElement {
  const root = box('game');
  const stage = box('game-stage');
  const controls = box('game-controls');
  const keys = box('game-keys');
  const canvas = document.createElement('canvas');

  canvas.className = 'game-canvas';
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  canvas.tabIndex = -1;
  canvas.setAttribute('role', 'img');
  canvas.setAttribute('aria-label', strings.label);

  keys.append(key('left'), key('right'));
  stage.append(canvas);
  controls.append(keys, button('dpad-enter', strings.fire, 'fire'), button('btn btn-secondary', strings.back, 'quit'));
  root.append(stage, controls);

  return root;
}

export function run(container: HTMLElement, strings: GameStrings): Promise<Result> {
  const terminal = container.querySelector<HTMLElement>('.terminal')!;
  const root = view(strings);

  container.append(root);
  terminal.hidden = true;

  const canvas = root.querySelector('canvas')!;
  const input = createInput(root);
  const renderer = createRenderer(canvas, strings);

  return new Promise<Result>((resolve) => {
    let game = createGame(readBest());
    let frame = 0;
    let last = performance.now();
    let carry = 0;

    function finish(): void {
      cancelAnimationFrame(frame);
      input.destroy();
      unwatch();
      window.removeEventListener('resize', renderer.fit);
      document.removeEventListener('visibilitychange', wake);
      root.remove();
      terminal.hidden = false;
      writeBest(game.best);
      resolve({ score: game.score, best: game.best });
    }

    function wake(): void {
      last = performance.now();
    }

    function tick(now: number): void {
      frame = requestAnimationFrame(tick);

      if (input.takeQuit()) {
        finish();
        return;
      }

      if (input.takePause()) {
        game.paused = !game.paused;
      }

      if (game.over && input.takeShot()) {
        game = createGame(game.best);
      }

      if (game.paused || document.hidden) {
        last = now;
        renderer.draw(game);
        return;
      }

      carry = Math.min(carry + now - last, STEP_MS * MAX_CATCH_UP);
      last = now;

      while (carry >= STEP_MS) {
        update(game, input);
        carry -= STEP_MS;
      }

      renderer.draw(game);
    }

    const unwatch = subscribe(() => {
      if (state.mode !== 'console') {
        finish();
      }
    });

    renderer.fit();
    canvas.focus({ preventScroll: true });
    window.addEventListener('resize', renderer.fit);
    document.addEventListener('visibilitychange', wake);
    frame = requestAnimationFrame(tick);
  });
}
