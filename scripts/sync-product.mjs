// Reads the product repo (never writes to it) and vendors an allowlisted copy of the catalog and the global scoring rules.
// Usage: npm run sync:product -- [path-to-product-repo]
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { homedir } from 'node:os';
import { parse } from 'yaml';
import { CATALOG_SHAPE, SCORING_KEYS, SCORING_RECIPE_KEYS, pick } from './lib/catalog-allowlist.mjs';

const repo = process.argv[2] ?? join(homedir(), 'territory-signals');
const read = (p) => readFileSync(join(repo, p), 'utf8');

const raw = JSON.parse(read('dashboard/src/data/catalog.generated.json'));
const catalog = Object.fromEntries(
  Object.entries(CATALOG_SHAPE).map(([key, fields]) => [key, fields === true ? raw[key] : raw[key].map((row) => pick(row, fields))]),
);

const yaml = parse(read('config/scoring.yaml'));
const scoring = pick(yaml, SCORING_KEYS);
scoring.recipes = Object.fromEntries(Object.entries(yaml.recipes).map(([k, v]) => [k, pick(v, SCORING_RECIPE_KEYS)]));

writeFileSync('src/data/product-catalog.json', `${JSON.stringify(catalog, null, 2)}\n`);
writeFileSync('src/data/product-scoring.json', `${JSON.stringify(scoring, null, 2)}\n`);
console.log(`synced ${catalog.recipes.length} recipes, ${catalog.components.length} components, model ${scoring.model_version}`);
