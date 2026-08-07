import type { Line } from './commands';

export interface Feed {
  print: (lines: Line[]) => void;
  clear: () => void;
}

function row(className: string): HTMLParagraphElement {
  const element = document.createElement('p');

  element.className = className;

  return element;
}

function entryElement(prefix: string, text: string, command: string): HTMLElement {
  const line = row('line-entry');
  const marker = document.createElement('span');
  const button = document.createElement('button');

  marker.className = 'prefix';
  marker.textContent = prefix;
  button.type = 'button';
  button.dataset.command = command;
  button.textContent = text;
  line.append(marker, button);

  return line;
}

function linkElement(text: string, href: string, label: string): HTMLElement {
  const line = row('line-out');
  const marker = document.createElement('span');
  const anchor = document.createElement('a');

  marker.className = 'prefix';
  marker.textContent = text;
  anchor.href = href;
  anchor.target = '_blank';
  anchor.rel = 'noopener';
  anchor.textContent = label;
  line.append(marker, anchor);

  return line;
}

function imageElement(src: string, alt: string, caption?: string): HTMLElement {
  const figure = document.createElement('figure');
  const image = document.createElement('img');

  figure.className = 'line-img';
  image.src = src;
  image.alt = alt;
  image.loading = 'lazy';
  figure.append(image);

  if (caption) {
    const text = document.createElement('figcaption');

    text.textContent = caption;
    figure.append(text);
  }

  return figure;
}

function fetchElement(art: string, host: string, fields: { label: string; value: string }[]): HTMLElement {
  const block = document.createElement('div');
  const picture = document.createElement('pre');
  const info = document.createElement('div');
  const title = row('fetch-host');
  const rule = row('fetch-rule');
  const list = document.createElement('dl');

  block.className = 'fetch';
  picture.className = 'fetch-art';
  picture.textContent = art;
  info.className = 'fetch-info';
  title.textContent = host;
  rule.textContent = '-'.repeat(host.length);

  for (const field of fields) {
    const label = document.createElement('dt');
    const value = document.createElement('dd');

    label.textContent = field.label;
    value.textContent = field.value;
    list.append(label, value);
  }

  info.append(title, rule, list);
  block.append(picture, info);

  return block;
}

function commandElement(text: string, prompt: HTMLElement): HTMLElement {
  const line = row('line-cmd');

  line.append(prompt.cloneNode(true), ` ${text}`);

  return line;
}

function lineElement(line: Line, prompt: HTMLElement): HTMLElement {
  switch (line.kind) {
    case 'cmd':
      return commandElement(line.text, prompt);
    case 'entry':
      return entryElement(line.prefix, line.text, line.command);
    case 'link':
      return linkElement(line.text, line.href, line.label);
    case 'img':
      return imageElement(line.src, line.alt, line.caption);
    case 'fetch':
      return fetchElement(line.art, line.host, line.fields);
    default: {
      const element = row(`line-${line.kind}`);

      element.textContent = line.text;

      return element;
    }
  }
}

export function createFeed(container: HTMLElement, screen: HTMLElement, prompt: HTMLElement): Feed {
  return {
    print(lines: Line[]): void {
      container.append(...lines.map((line) => lineElement(line, prompt)));
      screen.scrollTop = screen.scrollHeight;
    },

    clear(): void {
      container.replaceChildren();
    },
  };
}
