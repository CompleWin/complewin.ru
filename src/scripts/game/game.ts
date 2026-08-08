import { airborne, startWave, updateEnemies } from './enemies';
import type { Input } from './input';
import type { Bullet, Enemy, Game } from './model';
import {
  BULLET_HEIGHT,
  BULLET_WIDTH,
  ENEMY_HEIGHT,
  ENEMY_WIDTH,
  HEIGHT,
  PLAYER_HEIGHT,
  PLAYER_WIDTH,
  PLAYER_Y,
  WIDTH,
  burst,
  clamp,
  overlap,
} from './model';

const MARGIN = 8;
const PLAYER_SPEED = 1.4;
const PLAYER_BULLETS = 2;
const BULLET_SPEED = 4;
const LIVES = 3;
const RESPAWN_FRAMES = 48;
const SHIELD_FRAMES = 96;
const SHAKE_FRAMES = 12;
const TIER_POINTS = [60, 40, 20];
const DIVE_BONUS = 2;

export function createGame(best: number): Game {
  const game: Game = {
    wave: 0,
    score: 0,
    best,
    lives: LIVES,
    over: false,
    paused: false,
    time: 0,
    sway: 0,
    diveTimer: 0,
    shake: 0,
    player: { x: (WIDTH - PLAYER_WIDTH) / 2, alive: true, respawn: 0, shield: SHIELD_FRAMES },
    enemies: [],
    bullets: [],
    shots: [],
    particles: [],
  };

  startWave(game);

  return game;
}

function kill(game: Game, enemy: Enemy): void {
  game.enemies.splice(game.enemies.indexOf(enemy), 1);
  game.score += TIER_POINTS[enemy.tier] * (enemy.state === 'diving' ? DIVE_BONUS : 1);
  game.best = Math.max(game.best, game.score);
  burst(game, enemy.x + ENEMY_WIDTH / 2, enemy.y + ENEMY_HEIGHT / 2);
}

function strike(game: Game): void {
  game.player.alive = false;
  game.player.respawn = RESPAWN_FRAMES;
  game.lives -= 1;
  game.shake = SHAKE_FRAMES;
  burst(game, game.player.x + PLAYER_WIDTH / 2, PLAYER_Y + PLAYER_HEIGHT / 2);

  if (game.lives === 0) {
    game.over = true;
  }
}

function updatePlayer(game: Game, input: Input): void {
  const player = game.player;

  if (!player.alive) {
    if (game.lives === 0) {
      return;
    }

    player.respawn -= 1;

    if (player.respawn <= 0) {
      player.alive = true;
      player.x = (WIDTH - PLAYER_WIDTH) / 2;
      player.shield = SHIELD_FRAMES;
    }

    return;
  }

  const direction = (input.held.right ? 1 : 0) - (input.held.left ? 1 : 0);

  player.shield = Math.max(0, player.shield - 1);
  player.x = clamp(player.x + direction * PLAYER_SPEED, MARGIN, WIDTH - MARGIN - PLAYER_WIDTH);

  if (input.takeShot() && game.bullets.length < PLAYER_BULLETS) {
    game.bullets.push({
      x: player.x + (PLAYER_WIDTH - BULLET_WIDTH) / 2,
      y: PLAYER_Y - BULLET_HEIGHT,
      speed: -BULLET_SPEED,
    });
  }
}

function updateFlying(game: Game): void {
  for (const bullet of game.bullets) {
    bullet.y += bullet.speed;
  }

  for (const shot of game.shots) {
    shot.y += shot.speed;
  }

  for (const particle of game.particles) {
    particle.x += particle.dx;
    particle.y += particle.dy;
    particle.life -= 1;
  }

  game.bullets = game.bullets.filter((bullet) => bullet.y > 0);
  game.shots = game.shots.filter((shot) => shot.y < HEIGHT);
  game.particles = game.particles.filter((particle) => particle.life > 0);
}

function hitEnemy(game: Game, bullet: Bullet): boolean {
  const enemy = game.enemies.find(
    (candidate) => airborne(candidate) && overlap(bullet, BULLET_WIDTH, BULLET_HEIGHT, candidate, ENEMY_WIDTH, ENEMY_HEIGHT),
  );

  if (!enemy) {
    return false;
  }

  kill(game, enemy);

  return true;
}

function collide(game: Game): void {
  game.bullets = game.bullets.filter((bullet) => !hitEnemy(game, bullet));

  if (!game.player.alive || game.player.shield > 0) {
    return;
  }

  const player = { x: game.player.x, y: PLAYER_Y };
  const shot = game.shots.find((candidate) => overlap(candidate, BULLET_WIDTH, BULLET_HEIGHT, player, PLAYER_WIDTH, PLAYER_HEIGHT));
  const diver = game.enemies.find(
    (enemy) => enemy.state === 'diving' && overlap(enemy, ENEMY_WIDTH, ENEMY_HEIGHT, player, PLAYER_WIDTH, PLAYER_HEIGHT),
  );

  if (shot) {
    game.shots.splice(game.shots.indexOf(shot), 1);
  }

  if (diver) {
    kill(game, diver);
  }

  if (shot || diver) {
    strike(game);
  }
}

export function update(game: Game, input: Input): void {
  game.time += 1;
  game.shake = Math.max(0, game.shake - 1);

  updatePlayer(game, input);
  updateEnemies(game);
  updateFlying(game);
  collide(game);

  if (!game.over && game.enemies.length === 0 && game.particles.length === 0) {
    startWave(game);
  }
}
