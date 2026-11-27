/** Sorted collection access plus links derived from collection data and the product's recipe rules. */
import { getCollection, type CollectionEntry, type CollectionKey } from 'astro:content';
import { RECIPES, type Condition } from './product.ts';

export async function entries<K extends CollectionKey>(name: K): Promise<CollectionEntry<K>[]> {
  const all = await getCollection(name);
  return all.sort((a, b) => (a.data as { order: number }).order - (b.data as { order: number }).order);
}

export const PREFIX = { signals: '/signals', recipes: '/recipes', platform: '/platform', audiences: '/for', compare: '/compare', guides: '/guides' } as const;
export type PageCollection = keyof typeof PREFIX;

export const hrefOf = (collection: PageCollection, id: string) => `${PREFIX[collection]}/${id}`;

/** Component-key prefixes a recipe condition reads. Owner and parcel conditions map to the owner components. */
function conditionKeys(c: Condition): string[] {
  if ('all' in c) return c.all.flatMap(conditionKeys);
  if ('any' in c) return c.any.flatMap(conditionKeys);
  if ('not' in c) return conditionKeys(c.not);
  if ('signal' in c) return [c.group ? `${c.signal}:${c.group}` : c.signal];
  if ('owner' in c) {
    const field: Record<string, string> = { years_owned: 'owner:years_owned', absentee: 'owner:absentee', mortgage_open: 'owner:mortgage_open_false' };
    return [field[c.owner]!];
  }
  return [];
}

const covers = (componentKey: string, wanted: string) => componentKey === wanted || componentKey.startsWith(`${wanted}:`);

/** True when a score component is one a recipe's rule reads. */
export const recipeReads = (recipeKey: string, componentKey: string) => conditionKeys(RECIPES[recipeKey]!.when).some((w) => covers(componentKey, w));

export async function signalsForRecipe(recipeKey: string) {
  const wanted = conditionKeys(RECIPES[recipeKey]!.when);
  return (await entries('signals')).filter((s) => s.data.components.some((c) => wanted.some((w) => covers(c.key, w))));
}

export async function recipesForSignal(signalId: string) {
  const out = [];
  for (const recipe of await entries('recipes')) {
    if ((await signalsForRecipe(recipe.data.recipeKey)).some((s) => s.id === signalId)) out.push(recipe);
  }
  return out;
}

export async function guidesFor(kind: 'signals' | 'recipes' | 'markets', ids: string[]) {
  return (await entries('guides')).filter((g) => g.data[kind].some((x) => ids.includes(x)));
}

export const linkList = (collection: PageCollection, items: { id: string; data: object }[]) =>
  items.map((i) => {
    const data = i.data as { crumb: string; label?: string; summary?: string; shortDescription?: string };
    return { href: hrefOf(collection, i.id), label: data.label ?? data.crumb, note: data.shortDescription ?? data.summary };
  });

export async function faqFor(page: string) {
  return (await entries('faq')).filter((f) => f.data.pages.includes(page)).map((f) => ({ id: f.id, question: f.data.question, answer: f.data.answer }));
}
