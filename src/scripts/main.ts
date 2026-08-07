import { initPanels } from './panel';
import { subscribe } from './state';
import { initWorld, stateHash } from './world';

function keepHashInLinks(): void {
  const links = document.querySelectorAll<HTMLAnchorElement>('a[data-keep-hash]');
  const sync = () => {
    for (const link of links) {
      link.href = link.pathname + stateHash();
    }
  };

  subscribe(sync);
  sync();
}

const world = document.querySelector<HTMLElement>('[data-world]');

keepHashInLinks();
initPanels();

if (world) {
  initWorld(world);
}
