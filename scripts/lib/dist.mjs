import { existsSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

export function walk(dir, skip = () => false) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (skip(path, name)) continue;
    if (statSync(path).isDirectory()) out.push(...walk(path, skip));
    else out.push(path);
  }
  return out;
}
export const DIST = existsSync('dist/client') ? 'dist/client' : 'dist';
export function htmlPages() {
  if (!existsSync(DIST)) throw new Error('dist/ not found. Run `npm run build` first.');
  return walk(DIST)
    .filter((f) => f.endsWith('.html'))
    .map((file) => ({ file, path: `/${relative(DIST, file)}`.replace(/\.html$/, '').replace(/\/index$/, '') || '/' }));
}
export const fail = (name, problems) => {
  if (problems.length) {
    console.error(`\n${name}: ${problems.length} problem(s)\n${problems.map((p) => `  - ${p}`).join('\n')}`);
    process.exit(1);
  }
};
