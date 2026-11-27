/** Every page on the site with its meta: the fixed registry plus each collection entry. Used by OG images and llms.txt. */
import { PAGES } from '../data/pages.ts';
import { DESIGN_SYSTEM } from '../data/design-system.ts';
import { entries, type PageCollection } from './collections.ts';
import { metaOf } from './entry-meta.ts';
import type { PageMeta } from './page-meta.ts';

export async function collectionPages(name: PageCollection): Promise<PageMeta[]> {
  return (await entries(name)).map((e) => metaOf(name, e as Parameters<typeof metaOf>[1]));
}

export async function allPages(): Promise<PageMeta[]> {
  const names: PageCollection[] = ['signals', 'recipes', 'platform', 'audiences', 'compare', 'guides'];
  const fromCollections = (await Promise.all(names.map(collectionPages))).flat();
  return [...Object.values(PAGES as Record<string, PageMeta>), ...fromCollections, DESIGN_SYSTEM];
}
