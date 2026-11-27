// Every internal link, asset reference and in-page anchor in the build must resolve.
import { existsSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'node-html-parser';
import { DIST, htmlPages, fail } from './lib/dist.mjs';
import { SITE_ORIGIN } from './lib/origin.mjs';

const pages = htmlPages();
const ids = new Map(pages.map((p) => [p.path, new Set(parse(readFileSync(p.file, 'utf8')).querySelectorAll('[id]').map((e) => e.getAttribute('id')))]));
const isFile = (p) => existsSync(p) && statSync(p).isFile();
const problems = [];
let count = 0;

for (const { file, path } of pages) {
  const root = parse(readFileSync(file, 'utf8'));
  const refs = [
    ...root.querySelectorAll('a[href], link[href]').map((e) => e.getAttribute('href')),
    ...root.querySelectorAll('[src]').map((e) => e.getAttribute('src')),
    ...root.querySelectorAll('meta[property="og:image"], meta[name="twitter:image"]').map((e) => e.getAttribute('content')),
  ];
  for (let ref of refs) {
    if (ref.startsWith(SITE_ORIGIN)) ref = ref.slice(SITE_ORIGIN.length) || '/';
    if (/^(https?:|mailto:|tel:|data:)/.test(ref)) continue;
    count += 1;
    const [pathname, hash] = ref.split('#');
    const target = (pathname.split('?')[0] || path).replace(/(.)\/$/, '$1');
    if (pathname && !(ids.has(target) || isFile(join(DIST, target)))) { problems.push(`${path}: broken link ${ref}`); continue; }
    if (hash && ids.has(target) && !ids.get(target).has(hash)) problems.push(`${path}: missing anchor ${ref}`);
  }
}
fail('check-links', problems);
console.log(`check-links: ${count} internal references resolve`);
