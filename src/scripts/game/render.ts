import type { GameStrings } from '../../content/types';
import { airborne } from './enemies';
import type { Game } from './model';
import { BULLET_HEIGHT, BULLET_WIDTH, HEIGHT, PARTICLE_LIFE, PLAYER_WIDTH, PLAYER_Y, WIDTH } from './model';
import { STAR_TOKENS, createSprites, theme } from './sprites';

const HUD_SIZE = 8;
const HUD_MARGIN = 8;
const HUD_COLUMN = WIDTH / 2 + 6;
const HUD_LINE = 12;
const SCORE_DIGITS = 6;
const LIFE_SCALE = 0.7;
const LIFE_GAP = 4;

const STAR_COUNT = 42;
const STAR_SPEEDS = [0.22, 0.5];
const PARTICLE_SIZE = 2;
const SHAKE_RANGE = 4;
const BLINK_FRAMES = 4;

interface Star {
  x: number;
  y: number;
  layer: number;
}

export interface Renderer {
  draw: (game: Game) => void;
  fit: () => void;
}

function sky(): Star[] {
  return Array.from({ length: STAR_COUNT }, (_, index) => ({
    x: Math.floor(Math.random() * WIDTH),
    y: Math.floor(Math.random() * HEIGHT),
    layer: index % STAR_SPEEDS.length,
  }));
}

function digits(value: number): string {
  return String(value).padStart(SCORE_DIGITS, '0');
}

export function createRenderer(canvas: HTMLCanvasElement, strings: GameStrings): Renderer {
  const ctx = canvas.getContext('2d')!;
  const { colors, font } = theme();
  const sprites = createSprites(ctx, colors);
  const stars = sky();
  const motion = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  ctx.imageSmoothingEnabled = false;
  ctx.font = `${HUD_SIZE}px ${font}`;
  ctx.textBaseline = 'top';

  function drawStars(game: Game): void {
    STAR_SPEEDS.forEach((speed, layer) => {
      ctx.fillStyle = colors[STAR_TOKENS[layer]];

      for (const star of stars) {
        if (star.layer !== layer) {
          continue;
        }

        ctx.fillRect(star.x, Math.floor(motion ? (star.y + game.time * speed) % HEIGHT : star.y), 1, 1);
      }
    });
  }

  function drawEnemies(game: Game): void {
    for (const enemy of game.enemies) {
      if (airborne(enemy)) {
        sprites.enemy(enemy.tier, enemy.x, enemy.y);
      }
    }
  }

  function drawPlayer(game: Game): void {
    const player = game.player;

    if (!player.alive || (player.shield > 0 && Math.floor(game.time / BLINK_FRAMES) % 2 === 0)) {
      return;
    }

    sprites.ship(player.x, PLAYER_Y, 1);
  }

  function drawShots(game: Game): void {
    ctx.fillStyle = colors['--color-text'];

    for (const bullet of game.bullets) {
      ctx.fillRect(Math.round(bullet.x), Math.round(bullet.y), BULLET_WIDTH, BULLET_HEIGHT);
    }

    ctx.fillStyle = colors['--color-accent-300'];

    for (const shot of game.shots) {
      ctx.fillRect(Math.round(shot.x), Math.round(shot.y), BULLET_WIDTH, BULLET_HEIGHT);
    }
  }

  function drawParticles(game: Game): void {
    ctx.fillStyle = colors['--color-accent-400'];

    for (const particle of game.particles) {
      ctx.globalAlpha = particle.life / PARTICLE_LIFE;
      ctx.fillRect(Math.round(particle.x), Math.round(particle.y), PARTICLE_SIZE, PARTICLE_SIZE);
    }

    ctx.globalAlpha = 1;
  }

  function stat(label: string, value: string, x: number, y: number): void {
    const caption = label.toUpperCase();

    ctx.fillStyle = colors['--color-accent'];
    ctx.fillText(caption, x, y);
    ctx.fillStyle = colors['--color-text'];
    ctx.fillText(value, x + ctx.measureText(`${caption} `).width, y);
  }

  function drawHud(game: Game): void {
    const bottom = HEIGHT - HUD_MARGIN - HUD_SIZE;

    ctx.textAlign = 'left';
    stat(strings.score, digits(game.score), HUD_MARGIN, HUD_MARGIN);
    stat(strings.best, digits(game.best), HUD_COLUMN, HUD_MARGIN);
    stat(strings.wave, String(game.wave), HUD_COLUMN, bottom);

    for (let index = 0; index < game.lives; index += 1) {
      sprites.ship(HUD_MARGIN + index * (PLAYER_WIDTH * LIFE_SCALE + LIFE_GAP), bottom, LIFE_SCALE);
    }
  }

  function drawOverlay(game: Game): void {
    if (!game.over && !game.paused) {
      return;
    }

    ctx.textAlign = 'center';
    ctx.fillStyle = colors['--color-accent-300'];

    if (game.paused) {
      ctx.fillText(strings.paused.toUpperCase(), WIDTH / 2, HEIGHT / 2);
      return;
    }

    ctx.fillText(strings.over.toUpperCase(), WIDTH / 2, HEIGHT / 2 - HUD_LINE);
    ctx.fillStyle = colors['--color-neutral-400'];
    ctx.fillText(strings.again.toUpperCase(), WIDTH / 2, HEIGHT / 2 + HUD_LINE);
    ctx.fillText(strings.quit.toUpperCase(), WIDTH / 2, HEIGHT / 2 + HUD_LINE * 2);
  }

  return {
    draw(game: Game): void {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.fillStyle = colors['--color-bg'];
      ctx.fillRect(0, 0, WIDTH, HEIGHT);
      drawStars(game);

      if (motion && game.shake > 0) {
        ctx.translate(
          Math.round(Math.random() * SHAKE_RANGE - SHAKE_RANGE / 2),
          Math.round(Math.random() * SHAKE_RANGE - SHAKE_RANGE / 2),
        );
      }

      drawEnemies(game);
      drawPlayer(game);
      drawShots(game);
      drawParticles(game);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      drawHud(game);
      drawOverlay(game);
    },

    fit(): void {
      const stage = canvas.parentElement!;
      const scale = Math.max(1, Math.floor(Math.min(stage.clientWidth / WIDTH, stage.clientHeight / HEIGHT)));

      canvas.style.width = `${WIDTH * scale}px`;
      canvas.style.height = `${HEIGHT * scale}px`;
    },
  };
}
