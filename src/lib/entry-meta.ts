import type { PageMeta } from './page-meta.ts';
import { hrefOf, type PageCollection } from './collections.ts';

type MetaFields = Pick<PageMeta, 'crumb' | 'keyword' | 'headingTerm' | 'h1' | 'title' | 'description' | 'updated'>;

/** The page meta for a collection entry: its frontmatter plus the derived path. */
export function metaOf(collection: PageCollection, entry: { id: string; data: MetaFields }): PageMeta {
  const { crumb, keyword, headingTerm, h1, title, description, updated } = entry.data;
  return { path: hrefOf(collection, entry.id), crumb, keyword, headingTerm, h1, title, description, updated };
}
