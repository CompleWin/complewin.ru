export const WIDTH = 224;
export const HEIGHT = 256;
export const PLAYER_WIDTH = 13;
export const PLAYER_HEIGHT = 11;
export const PLAYER_Y = HEIGHT - 34;
export const ENEMY_WIDTH = 14;
export const ENEMY_HEIGHT = 11;
export const BULLET_WIDTH = 2;
export const BULLET_HEIGHT = 6;
export const PARTICLE_LIFE = 24;

const PARTICLES = 8;
const PARTICLE_SPEED = 1.1;

export type EnemyState = 'entering' | 'formation' | 'diving';

export interface Enemy {
  column: number;
  row: number;
  tier: number;
  x: number;
  y: number;
  state: EnemyState;
  time: number;
  span: number;
  fromX: number;
  fromY: number;
  viaX: number;
  viaY: number;
  swing: number;
  shots: number;
}

export interface Bullet {
  x: number;
  y: number;
  speed: number;
}

export interface Particle {
  x: number;
  y: number;
  dx: number;
  dy: number;
  life: number;
}

export interface Game {
  wave: number;
  score: number;
  best: number;
  lives: number;
  over: boolean;
  paused: boolean;
  time: number;
  sway: number;
  diveTimer: number;
  shake: number;
  player: { x: number; alive: boolean; respawn: number; shield: number };
  enemies: Enemy[];
  bullets: Bullet[];
  shots: Bullet[];
  particles: Particle[];
}

interface Box {
  x: number;
  y: number;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function curve(from: number, via: number, to: number, t: number): number {
  const rest = 1 - t;

  return rest * rest * from + 2 * rest * t * via + t * t * to;
}

export function overlap(
  first: Box,
  firstWidth: number,
  firstHeight: number,
  second: Box,
  secondWidth: number,
  secondHeight: number,
): boolean {
  return (
    first.x < second.x + secondWidth &&
    first.x + firstWidth > second.x &&
    first.y < second.y + secondHeight &&
    first.y + firstHeight > second.y
  );
}

export function burst(game: Game, x: number, y: number): void {
  for (let index = 0; index < PARTICLES; index += 1) {
    const angle = (index / PARTICLES) * Math.PI * 2;

    game.particles.push({
      x,
      y,
      dx: Math.cos(angle) * PARTICLE_SPEED,
      dy: Math.sin(angle) * PARTICLE_SPEED,
      life: PARTICLE_LIFE,
    });
  }
}
