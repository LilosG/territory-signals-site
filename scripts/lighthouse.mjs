// Mobile Lighthouse against a running server. Fails when a score or Web Vital misses the launch budget.
// Usage: npm run lighthouse -- [baseUrl]   (default http://127.0.0.1:4321)
import { mkdirSync, writeFileSync } from 'node:fs';
import lighthouse from 'lighthouse';
import { launch } from 'chrome-launcher';
import { chromium } from '@playwright/test';

const base = process.argv[2] ?? 'http://127.0.0.1:4321';
const PAGES = ['/', '/signals/building-permits', '/recipes/downsizer', '/request'];
const MIN = { performance: 95, accessibility: 100, 'best-practices': 100, seo: 100 };
const MAX_LCP = 1800;
const MAX_CLS = 0.05;

mkdirSync('lighthouse', { recursive: true });
const chrome = await launch({ chromePath: chromium.executablePath(), chromeFlags: ['--headless=new', '--no-sandbox'] });
let failed = false;
try {
  for (const path of PAGES) {
    const result = await lighthouse(base + path, { port: chrome.port, output: 'json', logLevel: 'error' });
    const { categories, audits } = result.lhr;
    writeFileSync(`lighthouse/${path === '/' ? 'home' : path.slice(1).replaceAll('/', '-')}.json`, result.report);
    const scores = Object.fromEntries(Object.keys(MIN).map((k) => [k, Math.round(categories[k].score * 100)]));
    const lcp = audits['largest-contentful-paint'].numericValue;
    const cls = audits['cumulative-layout-shift'].numericValue;
    console.log(`${path.padEnd(28)} perf ${scores.performance}  a11y ${scores.accessibility}  best ${scores['best-practices']}  seo ${scores.seo}  LCP ${(lcp / 1000).toFixed(2)}s  CLS ${cls.toFixed(3)}`);
    const misses = [...Object.entries(MIN).filter(([k, v]) => scores[k] < v).map(([k]) => k), ...(lcp >= MAX_LCP ? ['LCP'] : []), ...(cls >= MAX_CLS ? ['CLS'] : [])];
    if (misses.length) {
      failed = true;
      console.log(`  missed: ${misses.join(', ')}`);
      for (const [id, a] of Object.entries(audits)) if (a.score !== null && a.score < 0.9 && !['informative', 'manual', 'notApplicable'].includes(a.scoreDisplayMode)) console.log(`    ${id}: ${a.displayValue ?? a.title}`);
    }
  }
} finally {
  chrome.kill();
}
process.exit(failed ? 1 : 0);
