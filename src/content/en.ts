import type { Content } from './types';

export const en: Content = {
  meta: {
    title: 'Nikolay Ivakhnenko — C# / .NET developer',
    description:
      'Backend developer with commercial experience in industrial software. Java at Sber, own products on C# / ASP.NET Core. Rostov-on-Don, open to offers.',
    ogAlt: 'The site map: a character on a grid between the resume section pads',
  },

  ui: {
    plainResume: 'Plain resume',
    toMap: 'Back to the map',
    print: 'Print / PDF',
    language: 'Language',
    close: 'esc',
    enter: 'Enter',
    open: 'ENTER',
    openSection: 'Open section',
    closeSection: 'Close section',
    mapHint: '← ↑ ↓ → or WASD · Enter to open · Esc to close',
    mapLabel: 'Map: walk the character between the section pads',
    padAnnounce: 'Press Enter to open',
    pads: {
      about: 'About',
      experience: 'Experience',
      projects: 'Projects',
      skills: 'Skills',
      education: 'Education',
      teaching: 'Teaching',
      contact: 'Contact',
      console: 'console',
    },
    kickers: {
      about: 'Who I am',
      experience: 'Experience',
      projects: 'Projects',
      skills: 'Skills',
      education: 'Education',
      teaching: 'Teaching',
      contact: 'Get in touch',
    },
    resumeHeadings: {
      about: 'Profile',
      experience: 'Experience',
      teaching: 'Teaching',
      projects: 'Projects',
      skills: 'Skills',
      education: 'Education',
      languages: 'Languages',
    },
    notFound: {
      title: '404: no such file or directory',
      back: 'Back to the map',
    },
  },

  person: {
    name: 'Nikolay Ivakhnenko',
    fullName: 'Nikolay Ivakhnenko',
    role: 'C# / .NET developer',
    city: 'Rostov-on-Don',
    age: '22 (born 14 Apr 2004)',
    citizenship: 'Russian citizenship',
    badges: [
      { text: '22 · born 14 Apr 2004', variant: 'neutral' },
      { text: 'Rostov-on-Don', variant: 'neutral' },
      { text: 'Russian citizenship', variant: 'neutral' },
      { text: 'English B2', variant: 'neutral' },
      { text: 'Open to offers', variant: 'outline' },
    ],
    summary: [
      'Backend developer with commercial experience in industrial software. I work as a Java developer at Sber on the auto-lending platform: production code, code review, CI/CD and the information-security requirements of a large bank.',
      'My primary and target stack is C# / ASP.NET Core — my own products are built on it, including OpenKEGE, an education platform with real users. Confident with PostgreSQL, REST APIs, Docker, front-end work in React, Vue and Astro; I write automated tests.',
      'Working across two ecosystems — .NET and the JVM — gives me a broad engineering perspective and makes unfamiliar stacks quick to pick up. I value clean code, deliberate architecture and teamwork.',
    ],
    summaryPlain:
      'Backend developer with commercial experience in industrial software. I work as a Java developer at Sber on the auto-lending platform: production code, code review, CI/CD and the information-security requirements of a large bank. My primary and target stack is C# / ASP.NET Core — my own products are built on it, including OpenKEGE, an education platform with real users. Confident with PostgreSQL, REST APIs, Docker, front-end work in React, Vue and Astro; I write automated tests. Working across two ecosystems — .NET and the JVM — gives me a broad engineering perspective and makes unfamiliar stacks quick to pick up. I value clean code, deliberate architecture and teamwork.',
  },

  experience: {
    employer: 'Sberbank',
    position: 'Java developer',
    period: 'June 2026 — present · Rostov-on-Don',
    periodShort: 'June 2026 — present',
    platform:
      'Building the Operations Centre Workplace platform for auto lending — the internal system operations-centre staff use to process car-loan applications.',
    platformBrief:
      'Operations Centre Workplace platform for auto lending — the internal system used to process car-loan applications.',
    achievements: [
      {
        kicker: 'Information security',
        body: "Designed and shipped personal-data masking in the logs of two production services: names, passport data, phone and account numbers stopped reaching centralised logging in the clear. Closed the PII leak risk and brought both services in line with data-protection law and the bank's internal standards — by extending the shared masking utility without breaking the contract for adjacent teams.",
        brief: "Designed and shipped personal-data masking in the logs of two production services: names, passport data, phone and account numbers stopped reaching centralised logging in the clear. Closed the PII leak risk and brought both services in line with data-protection law and the bank's internal standards — by extending the shared masking utility without breaking the contract for adjacent teams.",
      },
      {
        kicker: 'Access control model',
        body: 'Reworked the role model across the whole stack — from permission checks on the backend to conditional rendering in the UI. Separated operations-centre roles by least privilege and removed the mismatches between what a user sees and what they are actually allowed to do.',
        brief: 'Reworked the role model across the whole stack — from backend permission checks to conditional rendering in the UI. Separated roles by least privilege and removed mismatches between what a user sees and what they are allowed to do.',
      },
      {
        kicker: 'Test automation',
        body: "Wrote 30+ end-to-end tests from scratch in Python + Playwright covering the platform's key user journeys. Turned manual regression into an automated run: regression became a repeatable procedure and defects surface before a build reaches the test environment.",
        brief: 'Wrote 30+ end-to-end tests from scratch in Python + Playwright. Turned manual regression into an automated run: regression became repeatable and defects surface before a build reaches the test environment.',
      },
    ],
    stackLabel: 'Stack:',
    stack: [
      'Java',
      'Spring Boot',
      'PostgreSQL',
      'REST API',
      'Python',
      'Playwright',
      'pytest',
      'Git',
      'Jira',
      'Confluence',
    ],
  },

  projects: {
    title: 'Projects',
    flagship: {
      name: 'OpenKEGE',
      badge: 'flagship',
      summary:
        'My own education service — a platform for preparing for the Russian national CS exam. ASP.NET Core backend, Vue 3 front end: client-server architecture over a REST API, sign-up and auth via JWT, CRUD over tasks and materials, file storage in S3-compatible object storage.',
      tags: ['C#', 'ASP.NET Core', 'Vue 3', 'PostgreSQL', 'JWT', 'S3', 'Tailwind'],
      links: [],
      resumeTitle: 'OpenKEGE — CS exam preparation platform',
      resumeSummary:
        'My own education service: ASP.NET Core backend, Vue 3 front end. REST API and routing, JWT auth, CRUD over tasks and materials, files in S3-compatible storage.',
      resumeStack: 'C#, ASP.NET Core, Vue 3, PostgreSQL, JWT, S3, Tailwind CSS',
    },
    rest: [
      {
        name: 'OpenKEGE Articles',
        summary:
          'An open article portal running in production. Interactive quizzes and an embedded Python editor: code runs in the browser through Pyodide, with no server-side compute. Articles in MDX, formulas in KaTeX, likes through Supabase. Open to outside authors — contributions come in as pull requests.',
        tags: ['Astro 6', 'React 19', 'TypeScript', 'MDX', 'Pyodide', 'KaTeX'],
        links: [
          { label: 'articles.openkege.ru', href: 'https://articles.openkege.ru' },
          { label: 'code', href: 'https://github.com/CompleWin/OpenKEGE-Articles' },
        ],
        resumeTitle: 'OpenKEGE Articles — education portal, open source',
        resumeSummary:
          'An open article portal running in production: interactive quizzes and an embedded Python editor — code executes in the browser through Pyodide. Articles in MDX, formulas in KaTeX, likes through Supabase. Open to outside contributors.',
        resumeStack: 'Astro 6, React 19, TypeScript, MDX, Tailwind CSS 4, Pyodide, KaTeX, Supabase',
      },
      {
        name: 'pro-punch',
        summary:
          'A web application built for an external client. Fullstack work: React on the client, Python on the server. Real client requirements and iterative scoping.',
        tags: ['React', 'TypeScript', 'Python', 'REST API'],
        links: [],
        meta: 'commercial project',
        resumeTitle: 'pro-punch — commercial client project',
        resumeSummary:
          'A web application built for an external client. Fullstack: React client, Python server. Real requirements and iterative scoping.',
        resumeStack: 'React, TypeScript, Python, REST API',
      },
      {
        name: 'Sudoku',
        summary:
          'A browser game with real-time multiplayer. Game logic on the Phaser engine, player-to-player interaction over Node.js and Socket.IO.',
        tags: ['JavaScript', 'Phaser', 'Node.js', 'Socket.IO'],
        links: [{ label: 'code', href: 'https://github.com/CompleWin/sudoku-game' }],
        resumeTitle: 'Sudoku — multiplayer game',
        resumeSummary:
          'A browser game with real-time multiplayer: game logic on Phaser, player interaction over Node.js and Socket.IO.',
        resumeStack: 'JavaScript, Phaser, Node.js, Socket.IO',
      },
      {
        name: 'anki-cloze-cards',
        summary:
          'An agent skill for Claude Code: turns an English word, idiom or phrasal verb into a ready cloze-in-context Anki card. Deduplication against a shared dictionary, handling of polysemous words and contrast pairs, TSV generation, note-type creation via the AnkiConnect API.',
        tags: ['Python', 'AnkiConnect', 'Agent Skills'],
        links: [{ label: 'code', href: 'https://github.com/CompleWin/anki-cloze-cards' }],
        resumeTitle: 'anki-cloze-cards — agent skill for Claude Code, open source',
        resumeSummary:
          'A skill that turns an English word, idiom or phrasal verb into a ready cloze-in-context Anki card: dictionary-wide deduplication, polysemous words and contrast pairs, TSV generation, note-type creation via the AnkiConnect API.',
        resumeStack: 'Python, Anki / AnkiConnect API, Claude Code Agent Skills',
      },
      {
        name: 'ContactWebApp',
        summary:
          'A CRUD application with an ASP.NET Core backend and a React client: REST API and database access through Entity Framework Core.',
        tags: ['C#', 'EF Core', 'React', 'PostgreSQL'],
        links: [{ label: 'code', href: 'https://github.com/CompleWin/ContactWebApp' }],
        resumeTitle: 'CRUD app on ASP.NET Core + React',
        resumeSummary:
          'REST API, database access through Entity Framework Core, CRUD operations for data management.',
        resumeStack: 'C#, ASP.NET Core, Entity Framework, React, PostgreSQL',
      },
      {
        name: 'Together-Hub',
        summary: 'A social-network prototype: sign-up and auth, CRUD over topics, comments on topics.',
        tags: ['C#', 'ASP.NET Core', 'JWT', 'PostgreSQL'],
        links: [{ label: 'code', href: 'https://github.com/CompleWin/Together-Hub' }],
        resumeTitle: 'Social network prototype',
        resumeSummary: 'Sign-up and auth, CRUD over topics, comments on topics.',
        resumeStack: 'C#, ASP.NET Core, PostgreSQL, JWT',
      },
    ],
  },

  skills: {
    title: 'Skills',
    rows: [
      { category: 'Languages', items: 'C#, Java, Python, JavaScript, TypeScript, C/C++, Assembler' },
      { category: 'Backend', items: 'ASP.NET Core, Entity Framework Core, Spring Boot, REST API, JWT, S3' },
      { category: 'Frontend', items: 'React, Vue.js, Astro, HTML, CSS, Tailwind CSS' },
      { category: 'Databases', items: 'PostgreSQL, SQL, MySQL, SQLite, Supabase' },
      { category: 'Testing', items: 'Playwright, pytest, e2e tests, JUnit' },
      { category: 'Tooling', items: 'Git, Docker, Postman, Jira, Confluence' },
    ],
    note: 'C# / ASP.NET Core is the target stack. Java and Spring Boot are production experience at Sber; I take the front end when a project needs it.',
  },

  education: {
    title: 'Education and languages',
    university: 'Southern Federal University',
    institute: 'Institute of Mathematics, Mechanics and Computer Science',
    program: 'Applied Mathematics and Computer Science',
    meta: 'BSc · 2026 · Rostov-on-Don',
    resumeUniversity: 'Southern Federal University, Rostov-on-Don',
    resumeMeta:
      'Institute of Mathematics, Mechanics and Computer Science · Applied Mathematics and Computer Science · BSc, 2026',
    languages: [
      { name: 'Russian', level: 'native' },
      { name: 'English', level: 'B2 — documentation, interview-ready' },
    ],
    languagesPlain: 'Russian — native · English — B2',
  },

  teaching: {
    title: 'Tutoring',
    subtitle: 'Computer science and exam preparation · 4 years in private practice',
    stats: [
      { value: '4 years', label: 'of continuous teaching practice' },
      { value: '32 reviews', label: 'from students and parents on Avito' },
    ],
    body: [
      'For four years I have taught computer science one-to-one and prepared school students for the national CS exam. I explain algorithms, data structures and Python so that the student solves the problem themselves rather than repeating my solution — and we work through every task type on the exam.',
      'Teaching taught me to put complex things plainly — the same skill code review, documentation and architecture discussions ask for. My products grew out of it: OpenKEGE and the open OpenKEGE Articles portal are built from what I explained to students every day.',
    ],
    results: {
      title: 'Student results',
      pending: 'TO BE ADDED',
      items: [
        { label: 'Average exam score', value: null },
        { label: 'Best result', value: null },
        { label: 'University admissions', value: null },
      ],
    },
    resumeTitle: 'Computer science tutor',
    resumeMeta: '4 years · private practice',
    resumeBody:
      'One-to-one computer science lessons and preparation for the national CS exam. I explain algorithms, data structures and Python so the student solves the problem themselves. 32 reviews from students and parents on Avito. OpenKEGE and the OpenKEGE Articles portal grew out of this practice.',
  },

  contact: {
    title: 'Contact',
    lead: 'Telegram is fastest. I reply within the day.',
    links: [
      {
        kind: 'telegram',
        label: 'Message on Telegram',
        short: '@nikolayivakhnenko',
        href: 'https://t.me/nikolayivakhnenko',
      },
      {
        kind: 'email',
        label: 'complewin@yandex.ru',
        short: 'complewin@yandex.ru',
        href: 'mailto:complewin@yandex.ru',
      },
      {
        kind: 'phone',
        label: '+7 951 826-12-76',
        short: '+7 (951) 826-12-76',
        href: 'tel:+79518261276',
      },
      {
        kind: 'github',
        label: 'github.com/CompleWin',
        short: 'github.com/CompleWin',
        href: 'https://github.com/CompleWin',
      },
    ],
    downloadPdf: 'Download PDF',
    note: 'Rostov-on-Don · open to remote work and relocation',
  },

  console: {
    label: 'Console: the file system of the site',
    inputLabel: 'Command',
    closeLabel: 'Close the console',
    whoami: 'Nikolay Ivakhnenko — C# / .NET developer from Rostov-on-Don. Java at Sberbank, own products on ASP.NET Core.',
    helpTitle: 'commands',
    commands: {
      help: { usage: 'help', text: 'this list' },
      ls: { usage: 'ls [-a] [path]', text: 'what is in a directory, -a shows the hidden ones' },
      cd: { usage: 'cd [path]', text: 'change directory, .. goes one level up' },
      pwd: { usage: 'pwd', text: 'where I am now' },
      cat: { usage: 'cat <file>', text: 'print a file' },
      tree: { usage: 'tree [path]', text: 'directory tree' },
      neofetch: { usage: 'neofetch', text: 'system card' },
      secrets: { usage: 'secrets', text: 'what is already found and where to look for the rest' },
      whoami: { usage: 'whoami', text: 'whose machine this is' },
      resume: { usage: 'resume', text: 'open the plain resume' },
      lang: { usage: 'lang', text: 'switch the language' },
      map: { usage: 'map', text: 'back to the map, same as exit and gui' },
      clear: { usage: 'clear', text: 'clear the feed, same as cls and Ctrl+L' },
    },
    errors: {
      noSuchFile: 'no such file or directory',
      notDirectory: 'not a directory',
      isDirectory: 'is a directory',
      denied: 'permission denied',
      missingOperand: 'missing operand',
      notFound: 'command not found: {} — try help',
    },
    secrets: {
      title: 'finds',
      found: 'found',
      hint: 'the secrets command shows the rest',
      command: 'command',
      unknown: '????',
      complete: 'all collected. A file named .thanks appeared in the home directory',
    },
    leaving: {
      map: 'Going back to the map…',
      resume: 'Opening the plain resume…',
      lang: 'Switching the language…',
    },
  },
};
