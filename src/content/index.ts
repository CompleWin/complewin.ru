import type { Content, Lang } from './types';
import { ru } from './ru';
import { en } from './en';

const CONTENT: Record<Lang, Content> = { ru, en };

export const LANGUAGES: { lang: Lang; label: string }[] = [
  { lang: 'ru', label: 'RU' },
  { lang: 'en', label: 'EN' },
];

export function getContent(lang: Lang): Content {
  return CONTENT[lang];
}

export function otherLang(lang: Lang): Lang {
  const index = LANGUAGES.findIndex((entry) => entry.lang === lang);

  return LANGUAGES[(index + 1) % LANGUAGES.length].lang;
}

export function localePath(lang: Lang, path: string): string {
  return lang === 'ru' ? path : `/en${path}`;
}
