// lastmod and indexability for the sitemap, read from content frontmatter and the fixed-page registry.
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'yaml';

export const NOINDEX_PATHS = ['/404', '/request/thanks', '/design-system'];
export const isIndexable = (pathname) => {
  const p = pathname.replace(/\/$/, '') || '/';
  return !NOINDEX_PATHS.includes(p) && !p.startsWith('/api');
};

const PREFIX = { signals: '/signals', recipes: '/recipes', platform: '/platform', audiences: '/for', compare: '/compare', guides: '/guides' };
let cache;
function dates() {
  if (cache) return cache;
  cache = new Map();
  const registry = readFileSync('src/data/pages.ts', 'utf8');
  for (const block of registry.matchAll(/path: "([^"]+)",[\s\S]*?updated: '([^']+)'/g)) cache.set(block[1], block[2]);
  for (const [collection, prefix] of Object.entries(PREFIX)) {
    const dir = join('src/content', collection);
    if (!existsSync(dir)) continue;
    for (const file of readdirSync(dir)) {
      const text = readFileSync(join(dir, file), 'utf8');
      const data = parse(file.endsWith('.md') ? text.split(/^---$/m)[1] : text);
      cache.set(`${prefix}/${file.replace(/\.(md|ya?ml)$/, '')}`, String(data.updated));
    }
  }
  return cache;
}
export const lastModified = (pathname) => dates().get(pathname.replace(/\/$/, '') || '/');
