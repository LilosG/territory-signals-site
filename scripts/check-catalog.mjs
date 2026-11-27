// The vendored catalog holds allowlisted fields only, and every recipe and signal entry matches it.
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'yaml';
import { CATALOG_SHAPE, SCORING_KEYS, SCORING_RECIPE_KEYS } from './lib/catalog-allowlist.mjs';
import { fail } from './lib/dist.mjs';

const json = (p) => JSON.parse(readFileSync(p, 'utf8'));
const catalog = json('src/data/product-catalog.json');
const scoring = json('src/data/product-scoring.json');
const problems = [];

const CLIENT_KEY = /^(client(_.*)?|enabled|team(_.*)?|brokerage|office_address|dre(_.*)?|drafts_per_run|cooldown_days|approval_required(_.*)?|territory|neighborhoods|planning_areas|llm|outreach|digest|owner_data_provider|monthly_budget_usd)$/i;
const walkKeys = (value, path, file) => {
  if (!value || typeof value !== 'object') return;
  for (const [key, child] of Object.entries(value)) {
    if (!Array.isArray(value) && CLIENT_KEY.test(key)) problems.push(`${file}: client-specific key "${path}${key}"`);
    walkKeys(child, `${path}${key}.`, file);
  }
};
walkKeys(catalog, '', 'product-catalog.json');
walkKeys(scoring, '', 'product-scoring.json');

for (const [key, value] of Object.entries(catalog)) {
  const shape = CATALOG_SHAPE[key];
  if (!shape) problems.push(`product-catalog.json: key "${key}" is not on the allowlist`);
  else if (shape !== true) for (const row of value) for (const k of Object.keys(row)) if (!shape.includes(k)) problems.push(`product-catalog.json: ${key}[].${k} is not on the allowlist`);
}
for (const key of Object.keys(scoring)) if (!SCORING_KEYS.includes(key)) problems.push(`product-scoring.json: key "${key}" is not on the allowlist`);
for (const recipe of Object.values(scoring.recipes)) for (const k of Object.keys(recipe)) if (!SCORING_RECIPE_KEYS.includes(k)) problems.push(`product-scoring.json: recipe key "${k}" is not on the allowlist`);
if (catalog.model_version !== scoring.model_version) problems.push('catalog and scoring model versions differ');

const entries = (collection) => {
  const dir = join('src/content', collection);
  if (!existsSync(dir)) return [];
  return readdirSync(dir).map((file) => ({ slug: file.replace(/\.(md|ya?ml)$/, ''), file: join(dir, file), data: parse(readFileSync(join(dir, file), 'utf8')) }));
};

const recipes = entries('recipes');
if (recipes.length) {
  const byKey = new Map(recipes.map((r) => [r.data.recipeKey, r]));
  for (const row of catalog.recipes) {
    const entry = byKey.get(row.key);
    const rule = scoring.recipes[row.key];
    if (!entry) { problems.push(`recipes: no entry for catalog recipe ${row.key}`); continue; }
    if (entry.data.label !== row.label || rule.label !== row.label) problems.push(`${entry.file}: label differs from the catalog`);
    if (entry.data.shortDescription !== row.short_description) problems.push(`${entry.file}: short description differs from the catalog`);
    const rationale = rule.rationale ?? rule.description;
    if (entry.data.rationale !== rationale) problems.push(`${entry.file}: rationale differs from scoring config`);
  }
  if (recipes.length !== catalog.recipes.length) problems.push('recipes: entry count differs from the catalog');
}

const signals = entries('signals');
if (signals.length) {
  const components = new Map(catalog.components.map((c) => [c.key, c]));
  const used = new Set();
  for (const s of signals) {
    for (const row of s.data.components) {
      const found = components.get(row.key);
      if (!found) { problems.push(`${s.file}: unknown component ${row.key}`); continue; }
      if (found.label !== row.label) problems.push(`${s.file}: label for ${row.key} differs from the catalog`);
      if (found.max_points !== row.maxPoints) problems.push(`${s.file}: max points for ${row.key} differ from the catalog`);
      if (used.has(row.key)) problems.push(`${s.file}: component ${row.key} is claimed twice`);
      used.add(row.key);
    }
  }
  for (const c of catalog.components) if (!used.has(c.key)) problems.push(`signals: no entry covers component ${c.key}`);
}
fail('check-catalog', problems);
console.log(`check-catalog: ${recipes.length} recipe and ${signals.length} signal entries match; no client-specific keys`);
