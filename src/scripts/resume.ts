const PRINT_PARAM = 'print';

const printButton = document.querySelector<HTMLButtonElement>('[data-print]');

printButton?.addEventListener('click', () => window.print());

if (new URLSearchParams(window.location.search).has(PRINT_PARAM)) {
  window.addEventListener('load', () => window.print());
}
