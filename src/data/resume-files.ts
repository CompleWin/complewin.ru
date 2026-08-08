import { getContent } from '../content';
import type { ContactLink, Content, Project } from '../content/types';
import type { FileLine } from '../scripts/vfs';

export interface Bilingual {
  ru: FileLine[];
  en: FileLine[];
}

const VCARD_FIELD: Record<ContactLink['kind'], string> = {
  telegram: 'URL',
  email: 'EMAIL',
  phone: 'TEL',
  github: 'URL',
};

const russian = getContent('ru');
const english = getContent('en');

function both(build: (content: Content) => FileLine[]): Bilingual {
  return { ru: build(russian), en: build(english) };
}

function paragraphs(items: string[]): FileLine[] {
  return items.flatMap((item, index) => (index === 0 ? [item] : ['', item]));
}

export const aboutFile = both((content) => [
  content.person.fullName,
  `${content.person.role} · ${content.person.city}`,
  `${content.person.age} · ${content.person.citizenship}`,
  content.education.languagesPlain,
  '',
  ...paragraphs(content.person.summary),
]);

export const experienceFile = both((content) => [
  `${content.experience.employer} · ${content.experience.position}`,
  content.experience.period,
  '',
  content.experience.platformBrief,
  '',
  ...content.experience.achievements.flatMap((achievement) => [`[${achievement.kicker}]`, achievement.brief, '']),
  `${content.experience.stackLabel} ${content.experience.stack.join(', ')}`,
]);

export const skillsFile = both((content) => [
  '{',
  ...content.skills.rows.map(
    (row) => `  "${row.category}": [${row.items.map((item) => `"${item}"`).join(', ')}],`,
  ),
  `  "note": "${content.skills.note}"`,
  '}',
]);

export const educationFile = both((content) => [
  content.education.resumeUniversity,
  content.education.institute,
  `${content.education.program} · ${content.education.meta}`,
  '',
  `${content.ui.resumeHeadings.languages}:`,
  ...content.education.languages.map((language) => `  ${language.name}: ${language.level}`),
]);

export const teachingFile = both((content) => [
  content.teaching.resumeTitle,
  content.teaching.subtitle,
  '',
  ...content.teaching.stats.map((stat) => `  ${stat.value} — ${stat.label}`),
  '',
  ...paragraphs(content.teaching.body),
]);

export const contactFile = both((content) => [
  'BEGIN:VCARD',
  'VERSION:3.0',
  `FN:${content.person.name}`,
  `TITLE:${content.person.role}`,
  `ADR:${content.person.city}`,
  ...content.contact.links.map((link): FileLine =>
    link.kind === 'phone'
      ? `TEL:${link.short}`
      : { text: `${VCARD_FIELD[link.kind]}:`, href: link.href, label: link.short },
  ),
  `NOTE:${content.contact.note}`,
  'END:VCARD',
]);

export function projectFile(select: (content: Content) => Project): Bilingual {
  return both((content) => {
    const project = select(content);
    const note = project.badge ?? project.meta;

    return [
      `# ${project.name}`,
      ...(note ? [`> ${note}`] : []),
      '',
      project.summary,
      '',
      `${content.experience.stackLabel} ${project.resumeStack}`,
      ...(project.links.length > 0 ? [''] : []),
      ...project.links.map((link): FileLine => ({ text: '- ', href: link.href, label: link.label })),
    ];
  });
}
