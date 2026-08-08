import type { Content } from './types';

export const ru: Content = {
  meta: {
    title: 'Николай Ивахненко — C# / .NET-разработчик',
    description:
      'Backend-разработчик с коммерческим опытом промышленной разработки. Java в Сбере, свои продукты на C# / ASP.NET Core. Ростов-на-Дону, открыт к предложениям.',
    ogAlt: 'Карта сайта-визитки: персонаж на сетке между площадками разделов резюме',
  },

  ui: {
    plainResume: 'Простое резюме',
    toMap: 'На карту',
    print: 'Печать / PDF',
    language: 'Язык',
    close: 'esc',
    enter: 'Enter',
    open: 'ENTER',
    openSection: 'Открыть раздел',
    closeSection: 'Закрыть раздел',
    mapHint: '← ↑ ↓ → или WASD · Enter — открыть · Esc — закрыть',
    mapLabel: 'Карта: персонаж ходит между площадками разделов',
    padAnnounce: 'Нажмите Enter, чтобы открыть',
    pads: {
      about: 'О себе',
      experience: 'Опыт',
      projects: 'Проекты',
      skills: 'Навыки',
      education: 'Образование',
      teaching: 'Преподавание',
      contact: 'Контакты',
      console: 'console',
    },
    kickers: {
      about: 'Кто я',
      experience: 'Опыт работы',
      projects: 'Проекты',
      skills: 'Навыки',
      education: 'Образование',
      teaching: 'Преподавание',
      contact: 'Связаться',
    },
    resumeHeadings: {
      about: 'О себе',
      experience: 'Опыт работы',
      teaching: 'Преподавание',
      projects: 'Проекты',
      skills: 'Навыки',
      education: 'Образование',
      languages: 'Языки',
    },
    notFound: {
      title: '404: нет такого файла или каталога',
      back: 'На карту',
    },
  },

  person: {
    name: 'Ивахненко Николай',
    fullName: 'Ивахненко Николай Евгеньевич',
    role: 'C# / .NET-разработчик',
    city: 'Ростов-на-Дону',
    age: '22 года (14.04.2004)',
    citizenship: 'Гражданство РФ',
    badges: [
      { text: '22 года · 14.04.2004', variant: 'neutral' },
      { text: 'Ростов-на-Дону', variant: 'neutral' },
      { text: 'Гражданство РФ', variant: 'neutral' },
      { text: 'Английский B2', variant: 'neutral' },
      { text: 'Открыт к предложениям', variant: 'outline' },
    ],
    summary: [
      'Backend-разработчик с коммерческим опытом промышленной разработки. Работаю Java-разработчиком в Сбере на платформе автокредитования: production-код, code review, CI/CD и требования информационной безопасности крупного банка.',
      'Основной и целевой стек — C# / ASP.NET Core: на нём построены мои собственные продукты, включая образовательную платформу OpenKEGE с реальными пользователями. Уверенно работаю с PostgreSQL, REST API, Docker, фронтендом на React, Vue и Astro, пишу автотесты.',
      'Опыт сразу в двух экосистемах — .NET и JVM — даёт широкий инженерный кругозор и позволяет быстро погружаться в незнакомый стек. Ценю чистый код, осознанную архитектуру и командную работу.',
    ],
    summaryPlain:
      'Backend-разработчик с коммерческим опытом промышленной разработки. Работаю Java-разработчиком в Сбере на платформе автокредитования: production-код, code review, CI/CD и требования информационной безопасности крупного банка. Основной и целевой стек — C# / ASP.NET Core: на нём построены мои собственные продукты, включая образовательную платформу OpenKEGE с реальными пользователями. Уверенно работаю с PostgreSQL, REST API, Docker, фронтендом на React, Vue и Astro, пишу автотесты. Опыт сразу в двух экосистемах — .NET и JVM — даёт широкий инженерный кругозор и позволяет быстро погружаться в незнакомый стек. Ценю чистый код, осознанную архитектуру и командную работу.',
  },

  experience: {
    employer: 'ПАО Сбербанк',
    position: 'Java-разработчик',
    period: 'июнь 2026 — настоящее время · Ростов-на-Дону',
    periodShort: 'июнь 2026 — н.в.',
    platform:
      'Разработка платформы «Рабочее место операционного центра» в направлении автокредитования — внутренней системы, через которую сотрудники операционного центра обрабатывают заявки на автокредиты.',
    platformBrief:
      'Платформа «Рабочее место операционного центра» в направлении автокредитования — внутренняя система обработки заявок на автокредиты.',
    achievements: [
      {
        kicker: 'Информационная безопасность',
        body: 'Спроектировал и внедрил маскирование персональных данных в логах двух промышленных сервисов: ФИО, паспортные данные, телефоны и номера счетов перестали попадать в централизованные системы логирования в открытом виде. Закрыл риск утечки ПДн и привёл сервисы в соответствие с ФЗ-152 и внутренними стандартами банка — через расширение общей утилиты маскирования, не сломав контракт для смежных команд.',
        brief: 'Спроектировал и внедрил маскирование персональных данных в логах двух промышленных сервисов: ФИО, паспортные данные, телефоны и номера счетов перестали попадать в централизованные системы логирования в открытом виде. Закрыл риск утечки ПДн и привёл сервисы в соответствие с ФЗ-152 и внутренними стандартами банка — через расширение общей утилиты маскирования, не сломав контракт для смежных команд.',
      },
      {
        kicker: 'Ролевая модель доступа',
        body: 'Переработал ролевую модель сквозь весь стек — от проверки прав на бэкенде до условного рендеринга интерфейса. Разграничил права между ролями операционного центра по принципу минимально необходимых привилегий и устранил расхождения между тем, что видит пользователь, и тем, что ему реально разрешено выполнять.',
        brief: 'Переработал ролевую модель сквозь весь стек — от проверки прав на бэкенде до условного рендеринга интерфейса. Разграничил права по принципу минимально необходимых привилегий и устранил расхождения между тем, что видит пользователь, и тем, что ему разрешено выполнять.',
      },
      {
        kicker: 'Автоматизация тестирования',
        body: 'С нуля написал более 30 e2e-автотестов на Python + Playwright, покрывших ключевые пользовательские сценарии. Перевёл ручные регрессионные проверки в автоматический прогон: регресс стал воспроизводимой процедурой, а дефекты выявляются до передачи сборки на тестовый контур.',
        brief: 'С нуля написал более 30 e2e-автотестов на Python + Playwright. Перевёл ручные регрессионные проверки в автоматический прогон: регресс стал воспроизводимой процедурой, дефекты выявляются до передачи сборки на тестовый контур.',
      },
    ],
    stackLabel: 'Стек:',
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
    title: 'Проекты',
    flagship: {
      name: 'OpenKEGE',
      badge: 'главный проект',
      summary:
        'Собственный образовательный веб-сервис — платформа подготовки к ЕГЭ по информатике. Backend на ASP.NET Core, frontend на Vue 3: клиент-серверная архитектура с REST API и маршрутизацией, регистрация и авторизация через JWT, CRUD над задачами и материалами, хранение файлов в S3-совместимом объектном хранилище.',
      tags: ['C#', 'ASP.NET Core', 'Vue 3', 'PostgreSQL', 'JWT', 'S3', 'Tailwind'],
      links: [],
      resumeTitle: 'OpenKEGE — платформа подготовки к ЕГЭ по информатике',
      resumeSummary:
        'Собственный образовательный веб-сервис: backend на ASP.NET Core, frontend на Vue 3. REST API и маршрутизация, авторизация через JWT, CRUD над задачами и материалами, файлы в S3-совместимом хранилище.',
      resumeStack: 'C#, ASP.NET Core, Vue 3, PostgreSQL, JWT, S3, Tailwind CSS',
    },
    rest: [
      {
        name: 'OpenKEGE Articles',
        summary:
          'Открытый портал статей по информатике, работающий в проде. Интерактивные квизы и встроенный редактор Python: код выполняется прямо в браузере через Pyodide, без серверных вычислений. Статьи в MDX, формулы в KaTeX, лайки через Supabase. Открыт для внешних авторов — статьи принимаются через pull request.',
        tags: ['Astro 6', 'React 19', 'TypeScript', 'MDX', 'Pyodide', 'KaTeX'],
        links: [
          { label: 'articles.openkege.ru', href: 'https://articles.openkege.ru' },
          { label: 'код', href: 'https://github.com/CompleWin/OpenKEGE-Articles' },
        ],
        resumeTitle: 'OpenKEGE Articles — образовательный портал, open source',
        resumeSummary:
          'Открытый портал статей, работающий в проде: интерактивные квизы и встроенный редактор Python — код выполняется в браузере через Pyodide. Статьи в MDX, формулы в KaTeX, лайки через Supabase. Открыт для внешних авторов.',
        resumeStack: 'Astro 6, React 19, TypeScript, MDX, Tailwind CSS 4, Pyodide, KaTeX, Supabase',
      },
      {
        name: 'pro-punch',
        summary:
          'Веб-приложение по заказу внешнего клиента. Fullstack-разработка: клиентская часть на React, серверная — на Python. Работа с реальными требованиями заказчика и итеративной постановкой задач.',
        tags: ['React', 'TypeScript', 'Python', 'REST API'],
        links: [],
        meta: 'коммерческий проект',
        resumeTitle: 'pro-punch — коммерческий проект под заказчика',
        resumeSummary:
          'Веб-приложение по заказу внешнего клиента. Fullstack: клиент на React, сервер на Python. Реальные требования заказчика и итеративная постановка задач.',
        resumeStack: 'React, TypeScript, Python, REST API',
      },
      {
        name: 'Sudoku',
        summary:
          'Браузерная игра с мультиплеером в реальном времени. Игровая логика на движке Phaser, взаимодействие между игроками — через Node.js и Socket.IO.',
        tags: ['JavaScript', 'Phaser', 'Node.js', 'Socket.IO'],
        links: [{ label: 'код', href: 'https://github.com/CompleWin/sudoku-game' }],
        resumeTitle: 'Sudoku — многопользовательская игра',
        resumeSummary:
          'Браузерная игра с мультиплеером в реальном времени: игровая логика на Phaser, взаимодействие между игроками через Node.js и Socket.IO.',
        resumeStack: 'JavaScript, Phaser, Node.js, Socket.IO',
      },
      {
        name: 'anki-cloze-cards',
        summary:
          'Agent skill для Claude Code: превращает английское слово, идиому или фразовый глагол в готовую карточку Anki формата cloze-in-context. Дедупликация по общему словарю, разбор многозначных слов и контрастных пар, генерация TSV, создание типа заметки через AnkiConnect API.',
        tags: ['Python', 'AnkiConnect', 'Agent Skills'],
        links: [{ label: 'код', href: 'https://github.com/CompleWin/anki-cloze-cards' }],
        resumeTitle: 'anki-cloze-cards — agent skill для Claude Code, open source',
        resumeSummary:
          'Навык, превращающий английское слово, идиому или фразовый глагол в готовую карточку Anki формата cloze-in-context: дедупликация по общему словарю, разбор многозначных слов и контрастных пар, генерация TSV, создание типа заметки через AnkiConnect API.',
        resumeStack: 'Python, Anki / AnkiConnect API, Claude Code Agent Skills',
      },
      {
        name: 'ContactWebApp',
        summary:
          'CRUD-приложение с серверной частью на ASP.NET Core и клиентом на React: REST API, работа с базой через Entity Framework Core.',
        tags: ['C#', 'EF Core', 'React', 'PostgreSQL'],
        links: [{ label: 'код', href: 'https://github.com/CompleWin/ContactWebApp' }],
        resumeTitle: 'CRUD-приложение на ASP.NET Core + React',
        resumeSummary:
          'REST API, работа с базой через Entity Framework Core, CRUD-операции для управления данными.',
        resumeStack: 'C#, ASP.NET Core, Entity Framework, React, PostgreSQL',
      },
      {
        name: 'Together-Hub',
        summary: 'Прототип социальной сети: регистрация и авторизация, CRUD топиков, комментарии к топикам.',
        tags: ['C#', 'ASP.NET Core', 'JWT', 'PostgreSQL'],
        links: [{ label: 'код', href: 'https://github.com/CompleWin/Together-Hub' }],
        resumeTitle: 'Прототип социальной сети',
        resumeSummary: 'Регистрация и авторизация, CRUD топиков, комментарии к топикам.',
        resumeStack: 'C#, ASP.NET Core, PostgreSQL, JWT',
      },
    ],
  },

  skills: {
    title: 'Навыки',
    rows: [
      { category: 'Языки программирования', items: 'C#, Java, Python, JavaScript, TypeScript, C/C++, Assembler' },
      { category: 'Backend', items: 'ASP.NET Core, Entity Framework Core, Spring Boot, REST API, JWT, S3' },
      { category: 'Frontend', items: 'React, Vue.js, Astro, HTML, CSS, Tailwind CSS' },
      { category: 'Базы данных', items: 'PostgreSQL, SQL, MySQL, SQLite, Supabase' },
      { category: 'Тестирование', items: 'Playwright, pytest, e2e-автотесты, JUnit' },
      { category: 'Инструменты', items: 'Git, Docker, Postman, Jira, Confluence' },
    ],
    note: 'Целевой стек — C# / ASP.NET Core. Java и Spring Boot — промышленный опыт в Сбере; фронтенд беру на себя, когда проект того требует.',
  },

  education: {
    title: 'Образование и языки',
    university: 'Южный федеральный университет',
    institute: 'Институт математики, механики и компьютерных наук',
    program: 'Прикладная математика и информатика',
    meta: 'бакалавриат · 2026 · Ростов-на-Дону',
    resumeUniversity: 'Южный федеральный университет, Ростов-на-Дону',
    resumeMeta:
      'Институт математики, механики и компьютерных наук · Прикладная математика и информатика · бакалавриат, 2026',
    languages: [
      { name: 'Русский', level: 'родной' },
      { name: 'Английский', level: 'B2 — читаю документацию, готов к интервью' },
    ],
    languagesPlain: 'Русский — родной · Английский — B2',
  },

  teaching: {
    title: 'Репетиторство',
    subtitle: 'Информатика и подготовка к ЕГЭ · 4 года частной практики',
    stats: [
      { value: '4 года', label: 'непрерывной практики преподавания' },
      { value: '32 отзыва', label: 'от учеников и родителей на Авито' },
    ],
    body: [
      'Четыре года веду частные занятия по информатике и готовлю школьников к ЕГЭ. Объясняю алгоритмы, структуры данных и Python так, чтобы ученик решал задачу сам, а не повторял разбор — и разбираю с ним каждый тип задания экзамена.',
      'Преподавание научило меня формулировать сложное просто — это же требуется в code review, документации и на защите архитектурных решений. Из этой практики выросли и мои продукты: платформа OpenKEGE и открытый портал OpenKEGE Articles собраны из того, что я объяснял ученикам каждый день.',
    ],
    results: {
      title: 'Результаты учеников',
      pending: 'ДОБАВИТЬ ПОЗЖЕ',
      items: [
        { label: 'Средний балл ЕГЭ', value: null },
        { label: 'Лучший результат', value: null },
        { label: 'Поступления', value: null },
      ],
    },
    resumeTitle: 'Репетитор по информатике',
    resumeMeta: '4 года · частная практика',
    resumeBody:
      'Частные занятия по информатике и подготовка школьников к ЕГЭ. Объясняю алгоритмы, структуры данных и Python так, чтобы ученик решал задачу сам. 32 отзыва от учеников и родителей на Авито. Из этой практики выросли платформа OpenKEGE и портал OpenKEGE Articles.',
  },

  contact: {
    title: 'Контакты',
    lead: 'Быстрее всего — в Telegram. Отвечаю в течение дня.',
    links: [
      {
        kind: 'telegram',
        label: 'Написать в Telegram',
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
    downloadPdf: 'Скачать PDF',
    note: 'Ростов-на-Дону · готов к удалённой работе и переезду',
  },

  console: {
    label: 'Консоль: файловая система сайта',
    inputLabel: 'Команда',
    closeLabel: 'Закрыть консоль',
    whoami: 'Ивахненко Николай — C# / .NET-разработчик из Ростова-на-Дону. Java в Сбере, свои продукты на ASP.NET Core.',
    helpTitle: 'команды',
    commands: {
      help: { usage: 'help', text: 'этот список' },
      ls: { usage: 'ls [-a] [путь]', text: 'что лежит в каталоге, -a покажет скрытое' },
      cd: { usage: 'cd [путь]', text: 'перейти в каталог, .. на уровень выше' },
      pwd: { usage: 'pwd', text: 'где я сейчас' },
      cat: { usage: 'cat <файл>', text: 'вывести файл' },
      tree: { usage: 'tree [путь]', text: 'дерево каталогов' },
      neofetch: { usage: 'neofetch', text: 'визитка системы' },
      secrets: { usage: 'secrets', text: 'что уже найдено и где искать остальное' },
      whoami: { usage: 'whoami', text: 'чья это машина' },
      resume: { usage: 'resume', text: 'открыть простое резюме' },
      lang: { usage: 'lang', text: 'переключить язык' },
      map: { usage: 'map', text: 'вернуться на карту, то же самое — exit и gui' },
      clear: { usage: 'clear', text: 'очистить ленту, то же самое — cls и Ctrl+L' },
    },
    errors: {
      noSuchFile: 'нет такого файла или каталога',
      notDirectory: 'это не каталог',
      isDirectory: 'это каталог',
      denied: 'отказано в доступе',
      missingOperand: 'не указан аргумент',
      notFound: 'команда не найдена: {} — попробуйте help',
    },
    secrets: {
      title: 'находки',
      found: 'найдено',
      hint: 'команда secrets покажет остальные',
      command: 'команда',
      unknown: '????',
      complete: 'собрано всё. В домашнем каталоге появился файл .thanks',
    },
    leaving: {
      map: 'Возвращаюсь на карту…',
      resume: 'Открываю простое резюме…',
      lang: 'Переключаю язык…',
    },
  },
};
