// Checks every built page: meta lengths and uniqueness, headings, answer paragraph, conversion links,
// dark bands, banned words, indexability, JSON-LD, guide length and the JavaScript budget.
import { readFileSync, existsSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import { join, posix } from 'node:path';
import { parse } from 'node-html-parser';
import { DIST, htmlPages, fail } from './lib/dist.mjs';
import { NOINDEX_PATHS } from './lib/lastmod.mjs';

const BANNED = /\b(unlock\w*|supercharg\w*|revolutioni[sz]\w*|game[- ]chang\w*|seamless\w*|leverag\w*|cutting[- ]edge|harness\w*|elevat\w*|empower\w*)\b|in today['’]s fast[- ]paced|AI[- ]powered/i;
const FORBIDDEN_TYPES = ['Review', 'AggregateRating', 'Offer', 'AggregateOffer', 'Rating'];
const NO_CTA = ['/request', '/privacy', '/terms'];
const NO_ANSWER = ['/privacy', '/terms'];
const JS_LIMIT = 30 * 1024;
const DEMO_LIMIT = 8 * 1024;

const problems = [];
const seen = { title: new Map(), description: new Map() };
const words = (s) => s.trim().split(/\s+/).filter(Boolean).length;
const norm = (s) => s.replace(/\s+/g, ' ').trim().toLowerCase();

function jsClosure(entry, found = new Set()) {
  const file = join(DIST, entry);
  if (found.has(entry) || !existsSync(file)) return found;
  found.add(entry);
  for (const m of readFileSync(file, 'utf8').matchAll(/(?:from|import)\s*\(?\s*["'](\.{1,2}\/[^"']+\.js)["']/g)) {
    jsClosure(posix.join(posix.dirname(entry), m[1]), found);
  }
  return found;
}

for (const { file, path } of htmlPages()) {
  const root = parse(readFileSync(file, 'utf8'), { blockTextElements: { script: true, style: true } });
  const noindex = NOINDEX_PATHS.includes(path);
  const bad = (msg) => problems.push(`${path}: ${msg}`);

  const title = root.querySelector('title')?.text.trim() ?? '';
  const description = root.querySelector('meta[name="description"]')?.getAttribute('content') ?? '';
  if (path !== '/design-system') {
    if (title.length < 50 || title.length > 60) bad(`title is ${title.length} characters`);
    if (description.length < 140 || description.length > 158) bad(`description is ${description.length} characters`);
  }
  for (const [kind, value] of [['title', title], ['description', description]]) {
    if (seen[kind].has(value)) bad(`duplicate ${kind} (also ${seen[kind].get(value)})`);
    seen[kind].set(value, path);
  }

  const h1 = root.querySelectorAll('h1');
  if (h1.length !== 1) bad(`${h1.length} H1 elements`);
  if (!root.querySelector('link[rel="canonical"]')) bad('no canonical');
  const robots = root.querySelector('meta[name="robots"]')?.getAttribute('content') ?? '';
  if (robots.includes('noindex') !== noindex) bad(noindex ? 'should be noindex' : 'content page is noindex');
  if (root.querySelectorAll('[style]').length) bad('inline style attribute');
  if (root.querySelectorAll('[data-dark-band]').length > 4) bad('more than four dark bands');

  for (const script of root.querySelectorAll('script[type="application/ld+json"]')) {
    try {
      const nodes = JSON.parse(script.text)['@graph'];
      const types = JSON.stringify(nodes).match(/"@type":"[^"]+"/g) ?? [];
      for (const t of types) if (FORBIDDEN_TYPES.includes(t.split('"')[3])) bad(`forbidden schema type ${t}`);
      if (path !== '/' && !nodes.some((n) => n['@type'] === 'BreadcrumbList')) bad('no BreadcrumbList');
    } catch (e) {
      bad(`JSON-LD does not parse: ${e.message}`);
    }
  }

  const main = root.querySelector('main');
  if (!main) { bad('no <main>'); continue; }

  if (!noindex) {
    // Headings: the primary term in at least two H2s (or every H2 when there are fewer), and the term, a close
    // variant or the location in the H1 and every other heading. Variants are set per page in its meta.
    const term = norm(main.getAttribute('data-heading-term') ?? '');
    const location = norm(main.getAttribute('data-heading-location') ?? '');
    const variants = (main.getAttribute('data-heading-variants') ?? '').split('|').map(norm).filter(Boolean);
    const allowed = [term, ...variants, location, 'san diego'].filter(Boolean);
    const fits = (text) => allowed.some((a) => text.includes(a));
    if (!term) bad('no heading term');
    const h1Text = norm(h1[0]?.text ?? '');
    if (!fits(h1Text)) bad(`H1 lacks "${term}" or a variant: ${h1Text}`);
    const h2s = main.querySelectorAll('h2').map((h) => norm(h.text));
    const withTerm = h2s.filter((t) => t.includes(term)).length;
    if (withTerm < Math.min(2, h2s.length)) bad(`only ${withTerm} H2 headings contain "${term}"`);
    for (const h of main.querySelectorAll('h2, h3, h4')) {
      const text = norm(h.text);
      if (!fits(text)) bad(`heading lacks "${term}", a variant or the location: ${text}`);
    }
    if (!NO_ANSWER.includes(path)) {
      const answer = main.querySelector('[data-answer]');
      const n = answer ? words(answer.text) : 0;
      if (n < 40 || n > 60) bad(`answer paragraph is ${n} words`);
    }
    if (!NO_CTA.includes(path)) {
      const links = main.querySelectorAll('a[href="/request"]');
      const band = main.querySelectorAll('[data-cta-band] a[href="/request"]').length;
      if (band !== 1) bad(`${band} request links in the CTA band`);
      if (links.length - band !== 1) bad(`${links.length - band} in-body request links`);
    }
  }

  const article = main.querySelector('[data-article-body]');
  if (article) {
    const n = words(article.structuredText);
    if (n < 1800 || n > 2800) bad(`guide body is ${n} words`);
  }

  const visible = parse(main.toString()).structuredText;
  const hit = `${title} ${description} ${visible}`.match(BANNED);
  if (hit) bad(`banned wording: ${hit[0]}`);
  if (/\p{Extended_Pictographic}/u.test(visible.replace(/[©®™]/g, ''))) bad('emoji in page text');
  if (/\b(TODO|TBD|FIXME|lorem ipsum)\b/i.test(visible)) bad('placeholder text');

  let bytes = 0;
  const files = new Set();
  for (const s of root.querySelectorAll('script')) {
    if (s.getAttribute('type') === 'application/ld+json') continue;
    const src = s.getAttribute('src');
    if (src?.startsWith('/')) jsClosure(src, files);
    else if (!src && s.text.trim()) bytes += gzipSync(s.text).length;
    if (s.text.includes('data-score-demo') && gzipSync(s.text).length > DEMO_LIMIT) bad('score demo script over 8 KB gzip');
  }
  for (const f of files) {
    const body = readFileSync(join(DIST, f));
    bytes += gzipSync(body).length;
    if (/score-?demo/i.test(f) && gzipSync(body).length > DEMO_LIMIT) bad(`score demo script over 8 KB gzip (${f})`);
  }
  if (bytes > JS_LIMIT) bad(`ships ${(bytes / 1024).toFixed(1)} KB of JavaScript (gzip)`);
}

fail('check-meta', problems);
console.log(`check-meta: ${seen.title.size} pages passed`);
