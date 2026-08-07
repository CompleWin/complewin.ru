import { setState, state, subscribe } from './state';
import { syncHash } from './world';

function closePanel(): void {
  setState({ panel: null });
  syncHash();
}

export function initPanels(): void {
  const dialogs = new Map<string, HTMLDialogElement>();

  for (const dialog of document.querySelectorAll<HTMLDialogElement>('[data-panel]')) {
    dialog.querySelector('h2')!.tabIndex = -1;
    dialogs.set(dialog.dataset.panel!, dialog);

    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) {
        closePanel();
      }
    });

    dialog.querySelector<HTMLElement>('[data-close]')!.addEventListener('click', closePanel);
  }

  let shown: HTMLDialogElement | null = null;

  subscribe(() => {
    const next = state.panel ? dialogs.get(state.panel) ?? null : null;

    if (next === shown) {
      return;
    }

    const previous = shown;

    shown = next;
    previous?.close();

    if (next) {
      next.showModal();
      next.querySelector('h2')!.focus({ preventScroll: true });
      return;
    }

    if (previous) {
      document
        .querySelector<HTMLElement>(`[data-pad="${previous.dataset.panel}"]`)
        ?.focus({ preventScroll: true });
    }
  });
}
