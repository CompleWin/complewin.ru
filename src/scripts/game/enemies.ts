import type { Enemy, Game } from './model';
import { BULLET_WIDTH, ENEMY_HEIGHT, ENEMY_WIDTH, HEIGHT, PLAYER_WIDTH, WIDTH, clamp, curve } from './model';

const COLUMNS = 8;
const ROWS = 5;
const COLUMN_STEP = 22;
const ROW_STEP = 18;
const FORMATION_LEFT = (WIDTH - (COLUMNS - 1) * COLUMN_STEP - ENEMY_WIDTH) / 2;
const FORMATION_TOP = 36;
const SWAY_AMPLITUDE = 14;
const SWAY_SPEED = 0.011;
const SWAY_SPEED_STEP = 0.0016;

const ENTRY_FRAMES = 48;
const ENTRY_GAP = 4;
const ENTRY_REACH = 0.4;
const ENTRY_DEPTH = 0.75;
const RETURN_FRAMES = 34;

const DIVE_SPEED = 1.45;
const DIVE_SPEED_STEP = 0.09;
const DIVE_STEER = 0.75;
const DIVE_SWING = 1.2;
const DIVE_WOBBLE = 0.055;
const DIVE_INTERVAL = 168;
const DIVE_INTERVAL_STEP = 15;
const DIVE_INTERVAL_MIN = 66;
const DIVE_SHOT_FRAMES = [22, 58];
const SHOT_SPEED = 1.7;
const MAX_DIVERS = 3;
const MAX_WAVE = 8;

const TIER_ROWS = [0, 1, 1, 2, 2];

function level(wave: number): number {
  return Math.min(wave, MAX_WAVE) - 1;
}

function swaySpeed(wave: number): number {
  return SWAY_SPEED + level(wave) * SWAY_SPEED_STEP;
}

function diveSpeed(wave: number): number {
  return DIVE_SPEED + level(wave) * DIVE_SPEED_STEP;
}

function diveInterval(wave: number): number {
  return Math.max(DIVE_INTERVAL_MIN, DIVE_INTERVAL - level(wave) * DIVE_INTERVAL_STEP);
}

function maxDivers(wave: number): number {
  return Math.min(MAX_DIVERS, 1 + Math.floor(level(wave) / 3));
}

function formationX(game: Game, enemy: Enemy): number {
  return FORMATION_LEFT + enemy.column * COLUMN_STEP + Math.sin(game.sway) * SWAY_AMPLITUDE;
}

function formationY(enemy: Enemy): number {
  return FORMATION_TOP + enemy.row * ROW_STEP;
}

export function airborne(enemy: Enemy): boolean {
  return enemy.state !== 'entering' || enemy.time > 0;
}

function spawn(row: number, column: number, index: number): Enemy {
  const side = column % 2 === 0 ? -1 : 1;
  const fromX = side < 0 ? -ENEMY_WIDTH * 2 : WIDTH + ENEMY_WIDTH;
  const fromY = -ENEMY_HEIGHT * 2;

  return {
    column,
    row,
    tier: TIER_ROWS[row],
    x: fromX,
    y: fromY,
    state: 'entering',
    time: -index * ENTRY_GAP,
    span: ENTRY_FRAMES,
    fromX,
    fromY,
    viaX: WIDTH / 2 + side * WIDTH * ENTRY_REACH,
    viaY: HEIGHT * ENTRY_DEPTH,
    swing: 0,
    shots: 0,
  };
}

export function startWave(game: Game): void {
  game.wave += 1;
  game.diveTimer = diveInterval(game.wave);

  for (let row = 0; row < ROWS; row += 1) {
    for (let column = 0; column < COLUMNS; column += 1) {
      game.enemies.push(spawn(row, column, row * COLUMNS + column));
    }
  }
}

function enterStep(game: Game, enemy: Enemy): void {
  enemy.time += 1;

  if (enemy.time <= 0) {
    return;
  }

  const t = Math.min(1, enemy.time / enemy.span);

  enemy.x = curve(enemy.fromX, enemy.viaX, formationX(game, enemy), t);
  enemy.y = curve(enemy.fromY, enemy.viaY, formationY(enemy), t);

  if (t === 1) {
    enemy.state = 'formation';
  }
}

function returnToFormation(game: Game, enemy: Enemy): void {
  enemy.state = 'entering';
  enemy.time = 0;
  enemy.span = RETURN_FRAMES;
  enemy.fromX = formationX(game, enemy);
  enemy.fromY = -ENEMY_HEIGHT;
  enemy.viaX = enemy.fromX;
  enemy.viaY = enemy.fromY;
  enemy.shots = 0;
}

function diveStep(game: Game, enemy: Enemy): void {
  const target = game.player.x + (PLAYER_WIDTH - ENEMY_WIDTH) / 2;

  enemy.time += 1;
  enemy.y += diveSpeed(game.wave);
  enemy.x += clamp(target - enemy.x, -DIVE_STEER, DIVE_STEER) + Math.sin(enemy.time * DIVE_WOBBLE) * enemy.swing;
  enemy.x = clamp(enemy.x, 0, WIDTH - ENEMY_WIDTH);

  if (DIVE_SHOT_FRAMES.includes(enemy.time)) {
    enemy.shots += 1;
    game.shots.push({ x: enemy.x + (ENEMY_WIDTH - BULLET_WIDTH) / 2, y: enemy.y + ENEMY_HEIGHT, speed: SHOT_SPEED });
  }

  if (enemy.y > HEIGHT) {
    returnToFormation(game, enemy);
  }
}

function launchDive(game: Game): void {
  const divers = game.enemies.filter((enemy) => enemy.state === 'diving');

  if (game.diveTimer > 0 || divers.length >= maxDivers(game.wave) || !game.player.alive) {
    return;
  }

  const ready = game.enemies.filter((enemy) => enemy.state === 'formation');

  game.diveTimer = diveInterval(game.wave);

  if (ready.length === 0) {
    return;
  }

  const enemy = ready[Math.floor(Math.random() * ready.length)];

  enemy.state = 'diving';
  enemy.time = 0;
  enemy.shots = 0;
  enemy.swing = (Math.random() < 0.5 ? -1 : 1) * DIVE_SWING;
}

export function updateEnemies(game: Game): void {
  game.sway += swaySpeed(game.wave);
  game.diveTimer -= 1;

  for (const enemy of game.enemies) {
    if (enemy.state === 'formation') {
      enemy.x = formationX(game, enemy);
      enemy.y = formationY(enemy);
    } else if (enemy.state === 'entering') {
      enterStep(game, enemy);
    } else {
      diveStep(game, enemy);
    }
  }

  launchDive(game);
}
