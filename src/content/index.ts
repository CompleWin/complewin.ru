import type { Content, Lang } from './types';
import { ru } from './ru';
import { en } from './en';

const CONTENT: Record<Lang, Content> = { ru, en };

export function getContent(lang: Lang): Content {
  return CONTENT[lang];
}

export function otherLang(lang: Lang): Lang {
  return lang === 'ru' ? 'en' : 'ru';
}

export function localePath(lang: Lang, path: string): string {
  return lang === 'ru' ? path : `/en${path}`;
}
