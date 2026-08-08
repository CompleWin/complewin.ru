import { ENEMY_HEIGHT, ENEMY_WIDTH, PLAYER_HEIGHT, PLAYER_WIDTH } from './model';

const FONT_TOKEN = '--font-mono';

const TOKENS = [
  '--color-bg',
  '--color-text',
  '--color-accent',
  '--color-accent-300',
  '--color-accent-400',
  '--color-accent-600',
  '--color-neutral-400',
  '--color-neutral-700',
  '--color-neutral-800',
] as const;

export type Token = (typeof TOKENS)[number];
export type Palette = Record<Token, string>;

export const STAR_TOKENS: Token[] = ['--color-neutral-800', '--color-neutral-700'];

const TIER_TOKENS: Token[] = ['--color-accent-300', '--color-accent-400', '--color-accent-600'];

const SHAPES = [
  [[0, 0], [0.5, 0.45], [1, 0], [1, 0.35], [0.5, 1], [0, 0.35]],
  [[0.5, 0], [1, 0.5], [0.5, 1], [0, 0.5]],
  [[0.25, 0], [0.75, 0], [0.75, 0.35], [1, 0.35], [1, 1], [0, 1], [0, 0.35], [0.25, 0.35]],
];

const SHIP_BODY = [
  [0.35, 0, 0.3, 0.3],
  [0.15, 0.2, 0.7, 0.6],
  [0, 0.65, 1, 0.35],
];

const SHIP_VISOR = [0.3, 0.35, 0.4, 0.15];

export interface Sprites {
  enemy: (tier: number, x: number, y: number) => void;
  ship: (x: number, y: number, scale: number) => void;
}

export function theme(): { colors: Palette; font: string } {
  const styles = getComputedStyle(document.documentElement);

  return {
    colors: Object.fromEntries(TOKENS.map((token) => [token, styles.getPropertyValue(token).trim()])) as Palette,
    font: styles.getPropertyValue(FONT_TOKEN).trim(),
  };
}

export function createSprites(ctx: CanvasRenderingContext2D, colors: Palette): Sprites {
  function part(box: number[], x: number, y: number, width: number, height: number): void {
    ctx.fillRect(
      Math.round(x + box[0] * width),
      Math.round(y + box[1] * height),
      Math.round(box[2] * width),
      Math.max(1, Math.round(box[3] * height)),
    );
  }

  return {
    enemy(tier: number, x: number, y: number): void {
      ctx.fillStyle = colors[TIER_TOKENS[tier]];
      ctx.beginPath();

      for (const [px, py] of SHAPES[tier]) {
        ctx.lineTo(Math.round(x + px * ENEMY_WIDTH), Math.round(y + py * ENEMY_HEIGHT));
      }

      ctx.closePath();
      ctx.fill();
    },

    ship(x: number, y: number, scale: number): void {
      const width = PLAYER_WIDTH * scale;
      const height = PLAYER_HEIGHT * scale;
      const gradient = ctx.createLinearGradient(0, y, 0, y + height);

      gradient.addColorStop(0, colors['--color-accent-300']);
      gradient.addColorStop(1, colors['--color-accent-600']);
      ctx.fillStyle = gradient;

      for (const box of SHIP_BODY) {
        part(box, x, y, width, height);
      }

      ctx.fillStyle = colors['--color-bg'];
      part(SHIP_VISOR, x, y, width, height);
    },
  };
}
