// Full-page screenshots of the main templates at desktop and mobile widths, against a running server.
// Usage: node scripts/screenshots.mjs <outDir> [baseUrl]
import { mkdirSync } from 'node:fs';
import { chromium } from '@playwright/test';

const out = process.argv[2];
if (!out) throw new Error('Usage: node scripts/screenshots.mjs <outDir> [baseUrl]');
const base = process.argv[3] ?? 'http://127.0.0.1:4321';
const PAGES = ['/', '/how-it-works', '/signals/building-permits', '/recipes/downsizer', '/platform', '/markets/san-diego'];

mkdirSync(out, { recursive: true });
const browser = await chromium.launch();
for (const width of [1440, 390]) {
  // Reduced motion shows every animated visual in its finished state.
  const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
  for (const path of PAGES) {
    await page.goto(base + path, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    const name = path === '/' ? 'home' : path.slice(1).replaceAll('/', '-');
    await page.screenshot({ path: `${out}/${name}-${width}.png`, fullPage: true });
  }
  await page.close();
}
await browser.close();
console.log(`${PAGES.length * 2} screenshots in ${out}`);
