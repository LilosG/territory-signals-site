import { PAGES } from '../data/pages.ts';
import type { PageMeta } from './page-meta.ts';

export type Crumb = { name: string; path: string };

/** Home, then each ancestor that is a real page, then the page itself. */
export function crumbsFor(meta: PageMeta): Crumb[] {
  const fixed = PAGES as Record<string, PageMeta>;
  const home = { name: fixed['/']!.crumb, path: '/' };
  if (meta.path === '/') return [home];
  const parts = meta.path.split('/').filter(Boolean);
  const ancestors = parts.slice(0, -1).map((_, i) => `/${parts.slice(0, i + 1).join('/')}`);
  return [
    home,
    ...ancestors.filter((p) => p in fixed).map((p) => ({ name: fixed[p]!.crumb, path: p })),
    { name: meta.crumb, path: meta.path },
  ];
}
