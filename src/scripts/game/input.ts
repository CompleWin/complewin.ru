type Action = 'left' | 'right' | 'shot' | 'pause' | 'quit';

export interface Input {
  held: Record<'left' | 'right', boolean>;
  takeShot: () => boolean;
  takePause: () => boolean;
  takeQuit: () => boolean;
  destroy: () => void;
}

const KEY_ACTIONS: Record<string, Action | undefined> = {
  arrowleft: 'left',
  a: 'left',
  ф: 'left',
  arrowright: 'right',
  d: 'right',
  в: 'right',
  ' ': 'shot',
  enter: 'shot',
  p: 'pause',
  з: 'pause',
  escape: 'quit',
};

function isHold(action: Action): action is 'left' | 'right' {
  return action === 'left' || action === 'right';
}

export function createInput(root: HTMLElement): Input {
  const held = { left: false, right: false };
  const pressed = { shot: false, pause: false, quit: false };

  function take(action: 'shot' | 'pause' | 'quit'): boolean {
    const value = pressed[action];

    pressed[action] = false;

    return value;
  }

  function keydown(event: KeyboardEvent): void {
    const action = KEY_ACTIONS[event.key.toLowerCase()];

    if (!action || (action === 'shot' && document.activeElement instanceof HTMLButtonElement)) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    if (isHold(action)) {
      held[action] = true;
      return;
    }

    if (!event.repeat) {
      pressed[action] = true;
    }
  }

  function keyup(event: KeyboardEvent): void {
    const action = KEY_ACTIONS[event.key.toLowerCase()];

    if (action && isHold(action)) {
      held[action] = false;
    }
  }

  function bindHold(action: 'left' | 'right'): void {
    const button = root.querySelector<HTMLElement>(`[data-action="${action}"]`)!;
    const release = () => {
      held[action] = false;
    };

    button.addEventListener('pointerdown', (event) => {
      event.preventDefault();
      held[action] = true;
    });
    button.addEventListener('pointerup', release);
    button.addEventListener('pointerleave', release);
    button.addEventListener('pointercancel', release);
  }

  bindHold('left');
  bindHold('right');

  root.querySelector<HTMLElement>('[data-action="fire"]')!.addEventListener('click', () => {
    pressed.shot = true;
  });

  root.querySelector<HTMLElement>('[data-action="quit"]')!.addEventListener('click', () => {
    pressed.quit = true;
  });

  window.addEventListener('keydown', keydown, true);
  window.addEventListener('keyup', keyup, true);

  return {
    held,
    takeShot: () => take('shot'),
    takePause: () => take('pause'),
    takeQuit: () => take('quit'),
    destroy: () => {
      window.removeEventListener('keydown', keydown, true);
      window.removeEventListener('keyup', keyup, true);
    },
  };
}
