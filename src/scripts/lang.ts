const FOCUS_STEP: Record<string, number> = {
  ArrowDown: 1,
  ArrowUp: -1,
};

export function initLangMenu(root: HTMLElement): void {
  const button = root.querySelector<HTMLButtonElement>('[data-lang-button]')!;
  const list = root.querySelector<HTMLElement>('[data-lang-list]')!;
  const items = [...list.querySelectorAll<HTMLAnchorElement>('a')];

  function isOpen(): boolean {
    return button.getAttribute('aria-expanded') === 'true';
  }

  function open(): void {
    button.setAttribute('aria-expanded', 'true');
    list.hidden = false;
    items[0].focus();
  }

  function close(): void {
    button.setAttribute('aria-expanded', 'false');
    list.hidden = true;
  }

  function focusStep(step: number): void {
    const current = items.findIndex((item) => item === document.activeElement);

    items[(current + step + items.length) % items.length].focus();
  }

  button.addEventListener('click', () => {
    if (isOpen()) {
      close();
      return;
    }

    open();
  });

  root.addEventListener('keydown', (event) => {
    if (!isOpen()) {
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        open();
      }

      return;
    }

    event.stopPropagation();

    if (event.key === 'Escape') {
      close();
      button.focus();
      return;
    }

    const step = FOCUS_STEP[event.key];

    if (!step) {
      return;
    }

    event.preventDefault();
    focusStep(step);
  });

  root.addEventListener('focusout', (event) => {
    if (event.relatedTarget instanceof Node && root.contains(event.relatedTarget)) {
      return;
    }

    close();
  });

  document.addEventListener('click', (event) => {
    if (event.target instanceof Node && root.contains(event.target)) {
      return;
    }

    close();
  });
}
