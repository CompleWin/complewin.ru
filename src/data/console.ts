import { getContent } from '../content';
import type { ConsoleStrings, Lang } from '../content/types';
import type { FileLine, FsFile } from '../scripts/vfs';
import {
  aboutFile,
  contactFile,
  educationFile,
  experienceFile,
  projectFile,
  skillsFile,
  teachingFile,
} from './resume-files';

export type Localized<T> = T | { ru: T; en: T };

interface EntryBase {
  path: string;
  secret?: boolean;
  reward?: boolean;
}

export type FsEntry =
  | (EntryBase & { kind: 'text'; body: Localized<FileLine[]> })
  | (EntryBase & { kind: 'image'; src: string; alt: Localized<string>; caption?: Localized<string> })
  | (EntryBase & { kind: 'denied'; message: Localized<string> })
  | (EntryBase & { kind: 'program'; id: string; blurb: Localized<string> });

export interface SecretCommand {
  name: string;
  rain?: boolean;
  body: Localized<FileLine[]>;
}

export interface Secret {
  name: string;
  rain?: boolean;
  body: FileLine[];
}

export interface FetchField {
  label: string;
  value: string;
}

export interface ConsolePayload {
  files: FsFile[];
  secrets: Secret[];
  fetch: { art: string; host: string; launch: string; fields: FetchField[] };
  strings: ConsoleStrings;
}

export const GAME_NAME = 'starfall';
export const PASSPHRASE = 'nocturne';
export const LAUNCH_DATE = '2026-08-04';

const HOST = 'nikolay@complewin.ru';

const GUY_ART = [
  '        ▄▄▄▄▄▄▄▄',
  '      ▄██████████▄',
  '     ████████████',
  '     ███▄▄▄▄▄▄███',
  '     ███████████',
  '      ▀████████▀',
  '       ▀██████▀',
  '        ▀▀▀▀▀▀',
].join('\n');

export const filesystem: FsEntry[] = [
  {
    path: '/etc/motd',
    kind: 'text',
    body: {
      ru: [
        'complewin-sh 1.0',
        '',
        'Это статический сайт: сервера нет, всё собрано заранее и лежит в вашем браузере.',
        'Резюме — в /home/nikolay, начните с readme.txt.',
      ],
      en: [
        'complewin-sh 1.0',
        '',
        'This is a static site: no server, everything was built ahead of time and lives in your browser.',
        'The resume is in /home/nikolay, start with readme.txt.',
      ],
    },
  },
  {
    path: '/etc/site.conf',
    kind: 'text',
    body: [
      '[site]',
      'domain     = complewin.ru',
      'generator  = Astro 7',
      'host       = GitHub Pages',
      'languages  = ru, en',
      'analytics  = none',
      'cookies    = none',
      '',
      '[budget]',
      'javascript = 8 kB gzip',
      'css        = 14 kB gzip',
      '',
      '[world]',
      'size       = 900x540',
      'step       = 60',
      'pads       = 8',
    ],
  },
  {
    path: '/etc/passwd',
    kind: 'text',
    secret: true,
    body: {
      ru: [
        'root:x:0:0:root:/root:/usr/sbin/nologin',
        'nikolay:x:1000:1000:Ивахненко Николай,C# / .NET,Ростов-на-Дону:/home/nikolay:/bin/complewin-sh',
        'guest:x:1001:1001:гость,читает резюме,права только на чтение:/home/nikolay:/bin/complewin-sh',
      ],
      en: [
        'root:x:0:0:root:/root:/usr/sbin/nologin',
        'nikolay:x:1000:1000:Nikolay Ivakhnenko,C# / .NET,Rostov-on-Don:/home/nikolay:/bin/complewin-sh',
        'guest:x:1001:1001:guest,reading a resume,read-only:/home/nikolay:/bin/complewin-sh',
      ],
    },
  },
  {
    path: '/home/nikolay/readme.txt',
    kind: 'text',
    body: {
      ru: [
        'Это домашний каталог. Здесь то же резюме, что и на карте, только текстом.',
        '',
        'about.txt        коротко о себе',
        'experience.log   опыт работы',
        'skills.json      стек по категориям',
        'education.txt    образование и языки',
        'teaching.txt     репетиторство',
        'contact.vcf      как связаться',
        'projects/        по файлу на проект',
        '',
        'Файловая система настоящая: ls, cd, cat и tree работают как обычно.',
        'Список команд — help. Имена в выводе ls кликабельные, если набирать лень.',
      ],
      en: [
        'This is the home directory. The same resume as on the map, only in plain text.',
        '',
        'about.txt        a short intro',
        'experience.log   work experience',
        'skills.json      the stack by category',
        'education.txt    education and languages',
        'teaching.txt     tutoring',
        'contact.vcf      how to get in touch',
        'projects/        one file per project',
        '',
        'The file system is real: ls, cd, cat and tree work the usual way.',
        'Type help for the commands. Names in ls output are clickable if typing is a bother.',
      ],
    },
  },
  { path: '/home/nikolay/about.txt', kind: 'text', body: aboutFile },
  { path: '/home/nikolay/experience.log', kind: 'text', body: experienceFile },
  { path: '/home/nikolay/skills.json', kind: 'text', body: skillsFile },
  { path: '/home/nikolay/education.txt', kind: 'text', body: educationFile },
  { path: '/home/nikolay/teaching.txt', kind: 'text', body: teachingFile },
  { path: '/home/nikolay/contact.vcf', kind: 'text', body: contactFile },
  {
    path: '/home/nikolay/.bash_history',
    kind: 'text',
    secret: true,
    body: [
      'dotnet watch run',
      'docker compose up -d postgres',
      "psql -U nikolay -d openkege -c 'select count(*) from users'",
      'git switch -c feature/console',
      'npm run build && du -sh dist',
      "git commit -m 'fix the camera on narrow screens'",
      'pytest tests/e2e -k roles',
      "ssh sber-dev 'tail -f /var/log/app/masking.log'",
      'curl wttr.in/Rostov-on-Don',
      'history | grep sudo',
    ],
  },
  {
    path: '/home/nikolay/.ssh/id_rsa',
    kind: 'denied',
    secret: true,
    message: {
      ru: 'Приватный ключ на то и приватный. Публичный лежит на GitHub.',
      en: 'A private key is private for a reason. The public one is on GitHub.',
    },
  },
  {
    path: '/home/nikolay/.thanks',
    kind: 'text',
    reward: true,
    body: {
      ru: [
        '  _________',
        '  \\       /',
        '   \\     /',
        '    \\___/',
        '     | |',
        '   __|_|__',
        '  |_______|',
        '',
        'Все тринадцать находок собраны.',
        '',
        'Спасибо за терпение. Чтобы дойти сюда, нужно было лазить по каталогам сайта, который вы видите первый раз, — это приятнее любой метрики.',
        '',
        `Кодовое слово: ${PASSPHRASE}`,
        '',
        'Напишите в Telegram и упомяните его: я сразу пойму, с чего начинать разговор.',
      ],
      en: [
        '  _________',
        '  \\       /',
        '   \\     /',
        '    \\___/',
        '     | |',
        '   __|_|__',
        '  |_______|',
        '',
        'All thirteen finds collected.',
        '',
        'Thank you for the patience. Getting here meant digging through the directories of a site you are seeing for the first time — that beats any metric I could put on this page.',
        '',
        `Passphrase: ${PASSPHRASE}`,
        '',
        'Send it to me on Telegram and I will know exactly where to start the conversation.',
      ],
    },
  },
  {
    path: '/home/nikolay/projects/openkege.md',
    kind: 'text',
    body: projectFile((content) => content.projects.flagship),
  },
  {
    path: '/home/nikolay/projects/openkege-articles.md',
    kind: 'text',
    body: projectFile((content) => content.projects.rest[0]),
  },
  {
    path: '/home/nikolay/projects/pro-punch.md',
    kind: 'text',
    body: projectFile((content) => content.projects.rest[1]),
  },
  {
    path: '/home/nikolay/projects/sudoku.md',
    kind: 'text',
    body: projectFile((content) => content.projects.rest[2]),
  },
  {
    path: '/home/nikolay/projects/anki-cloze-cards.md',
    kind: 'text',
    body: projectFile((content) => content.projects.rest[3]),
  },
  {
    path: '/home/nikolay/projects/contact-web-app.md',
    kind: 'text',
    body: projectFile((content) => content.projects.rest[4]),
  },
  {
    path: '/home/nikolay/projects/together-hub.md',
    kind: 'text',
    body: projectFile((content) => content.projects.rest[5]),
  },
  {
    path: '/media/memes.png',
    kind: 'image',
    secret: true,
    src: '/media/memes.png',
    alt: { ru: 'Мем про пятничный деплой', en: 'A meme about Friday deploys' },
    caption: { ru: 'Пятница, 17:50. Не надо.', en: 'Friday, 5:50 pm. Do not.' },
  },
  {
    path: '/media/setup.jpg',
    kind: 'image',
    secret: true,
    src: '/media/setup.jpg',
    alt: { ru: 'Рабочее место', en: 'The desk' },
    caption: { ru: 'Отсюда собирается всё, что вы видите.', en: 'Everything you see is built from here.' },
  },
  {
    path: '/media/.cat.png',
    kind: 'image',
    secret: true,
    src: '/media/cat.png',
    alt: { ru: 'Кот на клавиатуре', en: 'A cat on the keyboard' },
    caption: { ru: 'Штатный ревьюер.', en: 'The in-house reviewer.' },
  },
  {
    path: `/usr/games/${GAME_NAME}`,
    kind: 'program',
    secret: true,
    id: 'starfall',
    blurb: {
      ru: 'исполняемый файл: fixed shooter 224x256. Ещё не установлен — появится здесь же.',
      en: 'executable: a 224x256 fixed shooter. Not installed yet, it will show up right here.',
    },
  },
  {
    path: '/var/log/boot.log',
    kind: 'text',
    body: [
      '[    0.000000] complewin-sh 1.0 booting',
      '[    0.001204] astro 7: static output, 5 routes',
      '[    0.004612] tailwind 4: theme nocturne',
      '[    0.009880] fonts: inter variable, subsets latin + cyrillic',
      '[    0.014302] world: 900x540, 60px grid, 8 pads',
      '[    0.021756] sections: 7 dialogs prerendered',
      '[    0.030118] vfs: mounted / from static data',
      '[    0.031004] no server, no database, no cookies',
      '[    0.031882] ready',
    ],
  },
  {
    path: '/var/log/visitors.log',
    kind: 'text',
    secret: true,
    body: {
      ru: [
        '2026-07-29 11:04  bot        GET /robots.txt        200',
        '2026-08-01 09:12  рекрутер   GET /#experience       200',
        '2026-08-01 09:15  рекрутер   GET /resume/?print=1   200',
        '2026-08-02 02:31  кто-то     GET /#console          200',
        '2026-08-02 02:44  кто-то     cat /home/nikolay/.bash_history',
        '2026-08-05 13:20  я          git push origin main   200',
        'сейчас            вы         cat /var/log/visitors.log',
        '',
        'Аналитики на сайте нет. Последняя строка — вежливость, а не запись.',
      ],
      en: [
        '2026-07-29 11:04  bot        GET /robots.txt        200',
        '2026-08-01 09:12  recruiter  GET /#experience       200',
        '2026-08-01 09:15  recruiter  GET /resume/?print=1   200',
        '2026-08-02 02:31  someone    GET /#console          200',
        '2026-08-02 02:44  someone    cat /home/nikolay/.bash_history',
        '2026-08-05 13:20  me         git push origin main   200',
        'now               you        cat /var/log/visitors.log',
        '',
        'There is no analytics on this site. The last line is good manners, not a record.',
      ],
    },
  },
  {
    path: '/.trash/rejected-ideas.txt',
    kind: 'text',
    secret: true,
    body: {
      ru: [
        'Идеи, не дожившие до релиза.',
        '',
        '- Терминал как точка входа. Первый экран не должен требовать угадывать команды; терминал переехал на восьмую площадку карты.',
        '- Остров на three.js. Четыреста килобайт ради вида сверху, который здесь рисуют три градиента.',
        '- Курсор-фонарик, подсвечивающий тёмную карту. Красиво ровно один раз.',
        '- Звук печати в консоли. Автовоспроизведение на сайте-визитке не оправдывается ничем.',
        '- Снежинки в декабре. До сих пор жалко.',
        '- Счётчик «резюме открыли N раз». Аналитики здесь нет и не будет.',
      ],
      en: [
        'Ideas that did not make it to release.',
        '',
        '- The terminal as the entry point. A first screen should not ask you to guess commands; the terminal moved to the eighth pad on the map.',
        '- A three.js island. Four hundred kilobytes for a top-down view that three gradients already draw here.',
        '- A flashlight cursor lighting up the dark map. Beautiful exactly once.',
        '- Typing sounds in the console. Autoplay on a personal site is never worth it.',
        '- Snowflakes in December. Still sorry about that one.',
        '- A counter saying how many times the resume was opened. There is no analytics here and there will not be.',
      ],
    },
  },
];

export const secretCommands: SecretCommand[] = [
  {
    name: 'sudo',
    body: {
      ru: ['nikolay отсутствует в файле sudoers. Инцидент будет записан.'],
      en: ['nikolay is not in the sudoers file. This incident will be reported.'],
    },
  },
  {
    name: 'matrix',
    rain: true,
    body: {
      ru: ['Так производственный код не пишут. Но выглядит хорошо.'],
      en: ['Production code does not get written like this. Looks good though.'],
    },
  },
  {
    name: 'coffee',
    body: {
      ru: [
        "418 I'm a teapot",
        'Этот сервер — заварочный чайник и кофе не сварит из принципа.',
        { text: '', href: 'https://www.rfc-editor.org/rfc/rfc2324', label: 'RFC 2324' },
      ],
      en: [
        "418 I'm a teapot",
        'This server is a teapot and refuses to brew coffee on principle.',
        { text: '', href: 'https://www.rfc-editor.org/rfc/rfc2324', label: 'RFC 2324' },
      ],
    },
  },
  {
    name: '42',
    body: {
      ru: ['42.', 'Вопрос, к сожалению, утерян.'],
      en: ['42.', 'The question, unfortunately, has been lost.'],
    },
  },
];

function pick<T>(value: Localized<T>, lang: Lang): T {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) {
    return value as T;
  }

  const pair = value as { ru?: T; en?: T };

  return pair.ru === undefined ? (value as T) : (pair[lang] as T);
}

function resolveEntry(entry: FsEntry, lang: Lang): FsFile {
  const base = { path: entry.path, secret: entry.secret, reward: entry.reward };

  switch (entry.kind) {
    case 'text':
      return { ...base, kind: 'text', body: pick(entry.body, lang) };
    case 'image':
      return {
        ...base,
        kind: 'image',
        src: entry.src,
        alt: pick(entry.alt, lang),
        caption: entry.caption ? pick(entry.caption, lang) : undefined,
      };
    case 'denied':
      return { ...base, kind: 'denied', message: pick(entry.message, lang) };
    case 'program':
      return { ...base, kind: 'program', id: entry.id, blurb: pick(entry.blurb, lang) };
  }
}

function fetchFields(): FetchField[] {
  const { projects } = getContent('ru');

  return [
    { label: 'OS:', value: 'Astro 7 (static build)' },
    { label: 'Host:', value: 'GitHub Pages' },
    { label: 'Kernel:', value: 'TypeScript 5' },
    { label: 'Shell:', value: 'complewin-sh 1.0' },
    { label: 'Uptime:', value: '{} days' },
    { label: 'Theme:', value: 'Nocturne' },
    { label: 'Resolution:', value: '900x540' },
    { label: 'CPU:', value: 'C# / .NET' },
    { label: 'Co-CPU:', value: 'Java / Spring Boot' },
    { label: 'Memory:', value: 'PostgreSQL, S3' },
    { label: 'Locale:', value: 'ru_RU, en_US (B2)' },
    { label: 'Packages:', value: `${projects.rest.length + 1} projects, 1 in production` },
  ];
}

export function consolePayload(lang: Lang): ConsolePayload {
  return {
    files: filesystem.map((entry) => resolveEntry(entry, lang)),
    secrets: secretCommands.map((command) => ({
      name: command.name,
      rain: command.rain,
      body: pick(command.body, lang),
    })),
    fetch: { art: GUY_ART, host: HOST, launch: LAUNCH_DATE, fields: fetchFields() },
    strings: getContent(lang).console,
  };
}
