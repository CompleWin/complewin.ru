const FOUND_KEY = 'complewin.console.v1';
const OPENED_KEY = 'complewin.sections.v1';

function read(key: string): string[] {
  try {
    const stored: unknown = JSON.parse(localStorage.getItem(key) ?? '[]');

    return Array.isArray(stored) ? stored.filter((id): id is string => typeof id === 'string') : [];
  } catch {
    return [];
  }
}

function write(key: string, ids: string[]): void {
  try {
    localStorage.setItem(key, JSON.stringify(ids));
  } catch {
    return;
  }
}

export function readFound(): string[] {
  return read(FOUND_KEY);
}

export function writeFound(found: string[]): void {
  write(FOUND_KEY, found);
}

export function readOpened(): string[] {
  return read(OPENED_KEY);
}

export function writeOpened(opened: string[]): void {
  write(OPENED_KEY, opened);
}
