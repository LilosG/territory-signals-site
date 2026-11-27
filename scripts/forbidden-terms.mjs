// Fails if a forbidden term appears anywhere in the repo or the build output: file names, text, or metadata in binary files.
// The terms are stored encoded so that this repository never contains them literally.
import { readFileSync } from 'node:fs';
import { walk, fail } from './lib/dist.mjs';

const decode = (s) => Buffer.from(s, 'base64').toString('utf8');
const ANY_CASE = ['a2Fpc2Vy', 'cmFjaGFlbA==', 'Y29tcGFzcw==', 'a2Fpc2VyLXRlYW0='].map(decode);
const WHOLE_WORD = ['S1Q='].map(decode);

const patterns = [
  ...ANY_CASE.map((t) => ({ term: t, re: new RegExp(t, 'i') })),
  ...WHOLE_WORD.map((t) => ({ term: t, re: new RegExp(`(?<![A-Za-z0-9_$])${t}(?![A-Za-z0-9_$])`), textOnly: true })),
];

const SKIP = new Set(['node_modules', '.git', '.astro', '.wrangler', 'test-results', 'playwright-report', 'lighthouse']);
const files = walk('.', (_, name) => SKIP.has(name));
const BINARY = /\.(png|jpe?g|webp|avif|gif|ico|woff2?|ttf|otf|pdf|wasm)$/i;

const problems = [];
for (const file of files) {
  const binary = BINARY.test(file);
  const raw = readFileSync(file, binary ? 'latin1' : 'utf8');
  // In binary files only readable runs are searched (EXIF, XMP, PNG text chunks); compressed bytes are noise.
  const text = binary ? (raw.match(/[\x20-\x7e]{4,}/g) ?? []).join('\n') : raw;
  for (const p of patterns) {
    if (p.re.test(file)) problems.push(`${file}: forbidden term in file name`);
    if (!(binary && p.textOnly) && p.re.test(text)) problems.push(`${file}: forbidden term #${patterns.indexOf(p) + 1}`);
  }
}
fail('forbidden-terms', problems);
console.log(`forbidden-terms: ${files.length} files clean`);
