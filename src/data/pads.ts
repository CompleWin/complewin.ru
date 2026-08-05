import type { PadKey } from '../content/types';

export type PadIcon =
  | 'user'
  | 'briefcase'
  | 'code'
  | 'stack'
  | 'graduation-cap'
  | 'chalkboard-teacher'
  | 'paper-plane-tilt'
  | 'terminal-window';

export interface Pad {
  key: PadKey;
  x: number;
  y: number;
  icon: PadIcon;
}

export const PADS: Pad[] = [
  { key: 'about', x: 180, y: 120, icon: 'user' },
  { key: 'experience', x: 360, y: 60, icon: 'briefcase' },
  { key: 'projects', x: 540, y: 180, icon: 'code' },
  { key: 'skills', x: 720, y: 120, icon: 'stack' },
  { key: 'education', x: 660, y: 360, icon: 'graduation-cap' },
  { key: 'teaching', x: 180, y: 300, icon: 'chalkboard-teacher' },
  { key: 'contact', x: 420, y: 360, icon: 'paper-plane-tilt' },
  { key: 'console', x: 60, y: 420, icon: 'terminal-window' },
];

export const GLOW_DELAY_STEP_SECONDS = 0.4;

export function padAt(x: number, y: number): PadKey | null {
  const pad = PADS.find((candidate) => candidate.x === x && candidate.y === y);
  return pad ? pad.key : null;
}

export function padByKey(key: string): Pad | null {
  return PADS.find((candidate) => candidate.key === key) ?? null;
}
