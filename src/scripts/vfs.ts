import { HOME_DIR } from './state';

export type FileLine = string | { text: string; href: string; label: string };

interface FsBase {
  path: string;
  secret?: boolean;
  reward?: boolean;
}

export type FsFile =
  | (FsBase & { kind: 'text'; body: FileLine[] })
  | (FsBase & { kind: 'image'; src: string; alt: string; caption?: string })
  | (FsBase & { kind: 'denied'; message: string })
  | (FsBase & { kind: 'program'; blurb: string });

export interface FsNode {
  name: string;
  path: string;
  file: FsFile | null;
  children: FsNode[];
}

export type FsError = 'noSuchFile' | 'notDirectory' | 'isDirectory';

export type FsResult<T> = { ok: true; value: T } | { ok: false; error: FsError; path: string };

const ROOT = '/';
const HOME_PREFIX = '~';

function segments(path: string): string[] {
  return path.split('/').filter(Boolean);
}

function byName(first: FsNode, second: FsNode): number {
  return first.name.localeCompare(second.name);
}

export function buildTree(files: FsFile[]): FsNode {
  const root: FsNode = { name: '', path: ROOT, file: null, children: [] };

  for (const file of files) {
    const parts = segments(file.path);
    let node = root;

    parts.forEach((name, index) => {
      let child = node.children.find((candidate) => candidate.name === name);

      if (!child) {
        child = { name, path: `/${parts.slice(0, index + 1).join('/')}`, file: null, children: [] };
        node.children.push(child);
      }

      if (index === parts.length - 1) {
        child.file = file;
      }

      node = child;
    });
  }

  return root;
}

export function resolvePath(cwd: string, arg: string): string {
  const target = arg.trim();
  const fromHome = target === HOME_PREFIX || target.startsWith(`${HOME_PREFIX}/`);
  const base = target.startsWith(ROOT) ? [] : segments(fromHome ? HOME_DIR : cwd);
  const parts = [...base];

  for (const part of segments(fromHome ? target.slice(1) : target)) {
    if (part === '.') {
      continue;
    }

    if (part === '..') {
      parts.pop();
      continue;
    }

    parts.push(part);
  }

  return `/${parts.join('/')}`;
}

export function nodeAt(root: FsNode, path: string): FsNode | null {
  let node = root;

  for (const name of segments(path)) {
    const child: FsNode | undefined = node.children.find((candidate) => candidate.name === name);

    if (!child) {
      return null;
    }

    node = child;
  }

  return node;
}

export function children(node: FsNode, all: boolean): FsNode[] {
  return node.children.filter((child) => all || !child.name.startsWith('.')).sort(byName);
}

export function ls(root: FsNode, cwd: string, arg: string, all: boolean): FsResult<FsNode[]> {
  const path = resolvePath(cwd, arg);
  const node = nodeAt(root, path);

  if (!node) {
    return { ok: false, error: 'noSuchFile', path };
  }

  return { ok: true, value: node.file ? [node] : children(node, all) };
}

export function cd(root: FsNode, cwd: string, arg: string): FsResult<string> {
  const path = resolvePath(cwd, arg || HOME_DIR);
  const node = nodeAt(root, path);

  if (!node) {
    return { ok: false, error: 'noSuchFile', path };
  }

  if (node.file) {
    return { ok: false, error: 'notDirectory', path };
  }

  return { ok: true, value: path };
}

export function cat(root: FsNode, cwd: string, arg: string): FsResult<FsFile> {
  const path = resolvePath(cwd, arg);
  const node = nodeAt(root, path);

  if (!node) {
    return { ok: false, error: 'noSuchFile', path };
  }

  if (!node.file) {
    return { ok: false, error: 'isDirectory', path };
  }

  return { ok: true, value: node.file };
}

export function pathCompletions(root: FsNode, cwd: string, token: string): string[] {
  const cut = token.lastIndexOf('/');
  const head = cut === -1 ? '' : token.slice(0, cut + 1);
  const tail = token.slice(cut + 1);
  const node = nodeAt(root, resolvePath(cwd, head));

  if (!node || node.file) {
    return [];
  }

  return children(node, tail.startsWith('.'))
    .filter((child) => child.name.startsWith(tail))
    .map((child) => `${head}${child.name}${child.file ? '' : '/'}`);
}
