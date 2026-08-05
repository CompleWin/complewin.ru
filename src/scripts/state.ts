import type { PadKey } from '../content/types';

export type Mode = 'map' | 'console';

export interface State {
  mode: Mode;
  x: number;
  y: number;
  panel: PadKey | null;
  cwd: string;
  found: string[];
}

export const START_X = 60;
export const START_Y = 240;
export const HOME_DIR = '/home/nikolay';

export const state: State = {
  mode: 'map',
  x: START_X,
  y: START_Y,
  panel: null,
  cwd: HOME_DIR,
  found: [],
};

type Listener = (state: State) => void;

const listeners: Listener[] = [];

export function subscribe(listener: Listener): void {
  listeners.push(listener);
}

export function setState(patch: Partial<State>): void {
  Object.assign(state, patch);

  for (const listener of listeners) {
    listener(state);
  }
}
