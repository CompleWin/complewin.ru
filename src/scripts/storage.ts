const FOUND_KEY = 'complewin.console.v1';

export function readFound(): string[] {
  try {
    const stored: unknown = JSON.parse(localStorage.getItem(FOUND_KEY) ?? '[]');

    return Array.isArray(stored) ? stored.filter((id): id is string => typeof id === 'string') : [];
  } catch {
    return [];
  }
}

export function writeFound(found: string[]): void {
  try {
    localStorage.setItem(FOUND_KEY, JSON.stringify(found));
  } catch {
    return;
  }
}
