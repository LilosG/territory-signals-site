// Reads the product repo (never writes to it) and vendors each recipe's letter template, body text only.
// Usage: node scripts/sync-letters.mjs [path-to-product-repo]
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { homedir } from 'node:os';

const repo = process.argv[2] ?? join(homedir(), 'territory-signals');
const dir = join(repo, 'config/outreach_templates');
const letters = {};
for (const recipe of readdirSync(dir).sort()) {
  const text = readFileSync(join(dir, recipe, 'letter.md'), 'utf8').replace(/^---[\s\S]*?---\s*/, '');
  letters[recipe] = text.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
}
writeFileSync('src/data/product-letters.json', `${JSON.stringify(letters, null, 2)}\n`);
console.log(`synced ${Object.keys(letters).length} letter templates`);
