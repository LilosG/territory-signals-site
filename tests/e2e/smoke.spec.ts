import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { htmlPages } from '../../scripts/lib/dist.mjs';

const routes: string[] = (htmlPages() as { path: string }[]).map((p) => p.path).sort();
const widths = [390, 1440];

for (const width of widths) {
  test.describe(`${width}px`, () => {
    test.use({ viewport: { width, height: 900 } });
    for (const route of routes) {
      test(`${route}`, async ({ page }) => {
        const errors: string[] = [];
        page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
        page.on('pageerror', (e) => errors.push(e.message));
        const response = await page.goto(route);
        const expected = route === '/404' ? [200, 404] : [200];
        expect(expected).toContain(response!.status());
        await expect(page.locator('h1')).toHaveCount(1);
        await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
        for (const text of await page.locator('script[type="application/ld+json"]').allTextContents()) {
          expect(() => JSON.parse(text)).not.toThrow();
        }
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
        expect(overflow, 'horizontal overflow').toBeLessThanOrEqual(0);

        // Reveal the final state of the hero sequence before checking contrast.
        await page.emulateMedia({ reducedMotion: 'reduce' });
        const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
        expect(axe.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).slice(0, 4).join(' | ')}`)).toEqual([]);

        // 44px targets for standalone controls. Links inside running text are exempt (WCAG 2.5.8 inline exception).
        const small = await page.evaluate(() =>
          [...document.querySelectorAll<HTMLElement>('a.btn, button, summary, input:not([type=hidden]), select, textarea, label[data-target], header a:not(.skip-link), footer a')]
            .filter((el) => el.offsetParent !== null && !el.closest('[aria-hidden="true"], [inert], .hp-field') && !(el.tagName === 'A' && el.closest('p')?.textContent?.trim() !== el.textContent?.trim() && el.closest('p') && !el.classList.contains('btn')))
            .map((el) => ({ el, r: (el.closest('label[data-target]') ?? el).getBoundingClientRect() }))
            .filter(({ r }) => r.width > 0 && r.height < 43.5)
            .map(({ el, r }) => `${el.tagName.toLowerCase()} "${el.textContent?.trim().slice(0, 30)}" ${Math.round(r.height)}px`));
        expect(small, 'targets under 44px').toEqual([]);
        expect(errors).toEqual([]);
      });
    }
  });
}

test('unknown routes return the 404 page', async ({ page }) => {
  const response = await page.goto('/no-such-page');
  expect(response!.status()).toBe(404);
  await expect(page.locator('h1')).toHaveText('Page not found');
});

test('keyboard focus is visible and the skip link works', async ({ page }) => {
  await page.goto('/design-system');
  await page.keyboard.press('Tab');
  const skip = page.locator('.skip-link');
  await expect(skip).toBeFocused();
  await expect(skip).toBeVisible();
  await page.keyboard.press('Tab');
  const outline = await page.evaluate(() => getComputedStyle(document.activeElement!).outlineStyle);
  expect(outline).toBe('solid');
});

test('robots.txt, the sitemap and llms.txt are served', async ({ request }) => {
  const llms = await (await request.get('/llms.txt')).text();
  for (const expected of ['# Territory Signals', '## Data sources', '/signals/building-permits', '/recipes/downsizer']) expect(llms).toContain(expected);
  const robots = await (await request.get('/robots.txt')).text();
  for (const bot of ['Googlebot', 'Bingbot', 'GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'PerplexityBot', 'Google-Extended']) expect(robots).toContain(bot);
  const sitemap = await (await request.get('/sitemap-0.xml')).text();
  expect(sitemap).toContain('<lastmod>');
  for (const hidden of ['/request/thanks', '/404', '/design-system']) expect(sitemap).not.toContain(`${hidden}<`);
});
