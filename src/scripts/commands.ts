import type { CommandName, ConsoleStrings } from '../content/types';
import type { ConsolePayload, FetchField } from '../data/console';
import type { FileLine, FsError, FsFile, FsNode } from './vfs';
import { cat, cd, children, ls, nodeAt, resolvePath } from './vfs';

export type Line =
  | { kind: 'cmd' | 'head' | 'out' | 'dim' | 'err'; text: string }
  | { kind: 'link'; text: string; href: string; label: string }
  | { kind: 'entry'; prefix: string; text: string; command: string }
  | { kind: 'img'; src: string; alt: string; caption?: string }
  | { kind: 'fetch'; art: string; host: string; fields: FetchField[] };

export interface ConsoleContext {
  data: ConsolePayload;
  tree: FsNode;
  cwd: string;
  found: string[];
  total: number;
  links: { resume: string; lang: string };
}

export interface CommandResult {
  lines: Line[];
  cwd?: string;
  clear?: boolean;
  href?: string;
  toMap?: boolean;
  found?: string;
  rain?: boolean;
  program?: boolean;
}

const DAY_MS = 86400000;
const HELP_GAP = 2;
const PLACEHOLDER = '{}';
const GAMES_DIR = '/usr/games';

const ALIASES: Record<string, CommandName | undefined> = {
  exit: 'map',
  gui: 'map',
  cls: 'clear',
};

const HELP_ORDER: CommandName[] = [
  'help',
  'ls',
  'cd',
  'pwd',
  'cat',
  'tree',
  'neofetch',
  'secrets',
  'whoami',
  'resume',
  'lang',
  'map',
  'clear',
];

export function format(template: string, value: string): string {
  return template.replace(PLACEHOLDER, value);
}

function basename(path: string): string {
  return path.slice(path.lastIndexOf('/') + 1);
}

function dirname(path: string): string {
  return path.slice(0, path.lastIndexOf('/') + 1);
}

function failure(command: string, result: { error: FsError; path: string }, strings: ConsoleStrings): Line {
  return { kind: 'err', text: `${command}: ${result.path}: ${strings.errors[result.error]}` };
}

function entryLine(node: FsNode, prefix: string): Line {
  return {
    kind: 'entry',
    prefix,
    text: node.file ? node.name : `${node.name}/`,
    command: `${node.file ? 'cat' : 'cd'} ${node.path}`,
  };
}

function bodyLines(body: FileLine[]): Line[] {
  return body.map((line): Line =>
    typeof line === 'string'
      ? { kind: 'out', text: line }
      : { kind: 'link', text: line.text, href: line.href, label: line.label },
  );
}

function fileLines(file: FsFile, strings: ConsoleStrings): Line[] {
  switch (file.kind) {
    case 'text':
      return bodyLines(file.body);
    case 'image':
      return [{ kind: 'img', src: file.src, alt: file.alt, caption: file.caption }];
    case 'denied':
      return [
        { kind: 'err', text: `cat: ${file.path}: ${strings.errors.denied}` },
        { kind: 'dim', text: file.message },
      ];
    case 'program':
      return [{ kind: 'dim', text: `${basename(file.path)}: ${file.blurb}` }];
  }
}

function helpLines(context: ConsoleContext): Line[] {
  const { commands, helpTitle } = context.data.strings;
  const names = HELP_ORDER.filter((name) => name !== 'secrets' || context.found.length > 0);
  const width = Math.max(...names.map((name) => commands[name].usage.length)) + HELP_GAP;

  return [
    { kind: 'head', text: helpTitle },
    ...names.map((name): Line => ({
      kind: 'out',
      text: `${commands[name].usage.padEnd(width)}${commands[name].text}`,
    })),
  ];
}

function lsLines(context: ConsoleContext, args: string[]): Line[] {
  const all = args.includes('-a');
  const target = args.find((argument) => !argument.startsWith('-')) ?? '';
  const result = ls(context.tree, context.cwd, target, all);

  if (!result.ok) {
    return [failure('ls', result, context.data.strings)];
  }

  return result.value.map((node) => entryLine(node, ''));
}

function branchLines(node: FsNode, prefix: string, lines: Line[]): void {
  const items = children(node, false);

  items.forEach((child, index) => {
    const last = index === items.length - 1;

    lines.push(entryLine(child, `${prefix}${last ? '└── ' : '├── '}`));

    if (!child.file) {
      branchLines(child, `${prefix}${last ? '    ' : '│   '}`, lines);
    }
  });
}

function treeLines(context: ConsoleContext, arg: string): Line[] {
  const path = resolvePath(context.cwd, arg);
  const node = nodeAt(context.tree, path);

  if (!node) {
    return [failure('tree', { error: 'noSuchFile', path }, context.data.strings)];
  }

  if (node.file) {
    return [entryLine(node, '')];
  }

  const lines: Line[] = [{ kind: 'dim', text: path }];

  branchLines(node, '', lines);

  return lines;
}

function fetchLine(context: ConsoleContext): Line {
  const { art, host, launch, fields } = context.data.fetch;
  const days = Math.max(0, Math.floor((Date.now() - Date.parse(launch)) / DAY_MS));

  return {
    kind: 'fetch',
    art,
    host,
    fields: fields.map((field) => ({ label: field.label, value: format(field.value, String(days)) })),
  };
}

function secretsLines(context: ConsoleContext): Line[] {
  const { secrets } = context.data.strings;
  const lines: Line[] = [
    { kind: 'head', text: secrets.title },
    { kind: 'dim', text: `${secrets.found}: ${context.found.length}/${context.total}` },
    { kind: 'out', text: '' },
  ];

  for (const file of context.data.files.filter((entry) => entry.secret)) {
    lines.push(
      context.found.includes(file.path)
        ? { kind: 'entry', prefix: '', text: file.path, command: `cat ${file.path}` }
        : { kind: 'dim', text: `${secrets.unknown}  ${dirname(file.path)}` },
    );
  }

  for (const secret of context.data.secrets) {
    const known = context.found.includes(`cmd:${secret.name}`);

    lines.push({
      kind: known ? 'out' : 'dim',
      text: `${secrets.command}: ${known ? secret.name : secrets.unknown}`,
    });
  }

  return lines;
}

function catResult(context: ConsoleContext, arg: string): CommandResult {
  const strings = context.data.strings;

  if (!arg) {
    return { lines: [{ kind: 'err', text: `cat: ${strings.errors.missingOperand}` }] };
  }

  const result = cat(context.tree, context.cwd, arg);

  if (!result.ok) {
    return { lines: [failure('cat', result, strings)] };
  }

  return {
    lines: fileLines(result.value, strings),
    found: result.value.secret ? result.value.path : undefined,
  };
}

function cdResult(context: ConsoleContext, arg: string): CommandResult {
  const result = cd(context.tree, context.cwd, arg);

  return result.ok
    ? { lines: [], cwd: result.value }
    : { lines: [failure('cd', result, context.data.strings)] };
}

function programAt(context: ConsoleContext, path: string): FsFile | null {
  const file = nodeAt(context.tree, path)?.file;

  return file?.kind === 'program' ? file : null;
}

function launchResult(context: ConsoleContext, name: string): CommandResult | null {
  const file = programAt(context, resolvePath(context.cwd, name)) ?? programAt(context, `${GAMES_DIR}/${name}`);

  if (!file) {
    return null;
  }

  return { lines: [], program: true, found: file.secret ? file.path : undefined };
}

export function commandCompletions(prefix: string, found: string[]): string[] {
  const names: string[] = [
    ...HELP_ORDER.filter((name) => name !== 'secrets' || found.length > 0),
    ...Object.keys(ALIASES),
  ];

  return names.filter((name) => name.startsWith(prefix)).sort();
}

export function runCommand(input: string, context: ConsoleContext): CommandResult {
  const [head, ...args] = input.split(/\s+/);
  const name = ALIASES[head] ?? head;
  const strings = context.data.strings;

  switch (name) {
    case 'help':
      return { lines: helpLines(context) };
    case 'ls':
      return { lines: lsLines(context, args) };
    case 'cd':
      return cdResult(context, args[0] ?? '');
    case 'pwd':
      return { lines: [{ kind: 'out', text: context.cwd }] };
    case 'cat':
      return catResult(context, args[0] ?? '');
    case 'tree':
      return { lines: treeLines(context, args[0] ?? '') };
    case 'neofetch':
      return { lines: [fetchLine(context)] };
    case 'secrets':
      return { lines: secretsLines(context) };
    case 'whoami':
      return { lines: [{ kind: 'out', text: strings.whoami }] };
    case 'resume':
      return { lines: [{ kind: 'dim', text: strings.leaving.resume }], href: context.links.resume };
    case 'lang':
      return { lines: [{ kind: 'dim', text: strings.leaving.lang }], href: context.links.lang };
    case 'map':
      return { lines: [{ kind: 'dim', text: strings.leaving.map }], toMap: true };
    case 'clear':
      return { lines: [], clear: true };
  }

  const secret = context.data.secrets.find((command) => command.name === name);

  if (secret) {
    return { lines: bodyLines(secret.body), found: `cmd:${secret.name}`, rain: secret.rain };
  }

  return launchResult(context, head) ?? { lines: [{ kind: 'dim', text: format(strings.errors.notFound, input) }] };
}
