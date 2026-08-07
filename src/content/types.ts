export type Lang = 'ru' | 'en';

export type SectionKey =
  | 'about'
  | 'experience'
  | 'projects'
  | 'skills'
  | 'education'
  | 'teaching'
  | 'contact';

export type PadKey = SectionKey | 'console';

export interface Meta {
  title: string;
  description: string;
  ogAlt: string;
}

export interface Badge {
  text: string;
  variant: 'neutral' | 'outline';
}

export interface Person {
  name: string;
  fullName: string;
  role: string;
  city: string;
  age: string;
  citizenship: string;
  badges: Badge[];
  summary: string[];
  summaryPlain: string;
}

export interface Achievement {
  kicker: string;
  body: string;
  brief: string;
}

export interface Job {
  employer: string;
  position: string;
  period: string;
  periodShort: string;
  platform: string;
  platformBrief: string;
  achievements: Achievement[];
  stackLabel: string;
  stack: string[];
}

export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  name: string;
  badge?: string;
  summary: string;
  tags: string[];
  links: ProjectLink[];
  meta?: string;
  resumeTitle: string;
  resumeSummary: string;
  resumeStack: string;
}

export interface Projects {
  title: string;
  flagship: Project;
  rest: Project[];
}

export interface SkillRow {
  category: string;
  items: string;
}

export interface Skills {
  title: string;
  rows: SkillRow[];
  note: string;
}

export interface LanguageSkill {
  name: string;
  level: string;
}

export interface Education {
  title: string;
  university: string;
  institute: string;
  program: string;
  meta: string;
  resumeUniversity: string;
  resumeMeta: string;
  languages: LanguageSkill[];
  languagesPlain: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface StudentResult {
  label: string;
  value: string | null;
}

export interface Teaching {
  title: string;
  subtitle: string;
  stats: Stat[];
  body: string[];
  results: {
    title: string;
    pending: string;
    items: StudentResult[];
  };
  resumeTitle: string;
  resumeMeta: string;
  resumeBody: string;
}

export interface ContactLink {
  kind: 'telegram' | 'email' | 'phone' | 'github';
  label: string;
  short: string;
  href: string;
}

export interface Contact {
  title: string;
  lead: string;
  links: ContactLink[];
  downloadPdf: string;
  note: string;
}

export type CommandName =
  | 'help'
  | 'ls'
  | 'cd'
  | 'pwd'
  | 'cat'
  | 'tree'
  | 'neofetch'
  | 'secrets'
  | 'whoami'
  | 'resume'
  | 'lang'
  | 'map'
  | 'clear';

export interface CommandHelp {
  usage: string;
  text: string;
}

export interface ConsoleErrors {
  noSuchFile: string;
  notDirectory: string;
  isDirectory: string;
  denied: string;
  missingOperand: string;
  notFound: string;
}

export interface SecretStrings {
  title: string;
  found: string;
  hint: string;
  command: string;
  unknown: string;
  complete: string;
}

export interface ConsoleStrings {
  label: string;
  inputLabel: string;
  closeLabel: string;
  whoami: string;
  helpTitle: string;
  commands: Record<CommandName, CommandHelp>;
  errors: ConsoleErrors;
  secrets: SecretStrings;
  leaving: Record<'map' | 'resume' | 'lang', string>;
}

export interface UiStrings {
  plainResume: string;
  toMap: string;
  back: string;
  print: string;
  language: string;
  close: string;
  enter: string;
  open: string;
  openSection: string;
  closeSection: string;
  mapHint: string;
  mapLabel: string;
  padAnnounce: string;
  pads: Record<PadKey, string>;
  kickers: Record<SectionKey, string>;
  resumeHeadings: {
    about: string;
    experience: string;
    teaching: string;
    projects: string;
    skills: string;
    education: string;
    languages: string;
  };
  notFound: {
    title: string;
    back: string;
  };
}

export interface Content {
  meta: Meta;
  ui: UiStrings;
  person: Person;
  experience: Job;
  projects: Projects;
  skills: Skills;
  education: Education;
  teaching: Teaching;
  contact: Contact;
  console: ConsoleStrings;
}
