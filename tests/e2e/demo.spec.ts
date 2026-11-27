import { expect, test } from '@playwright/test';

test('the score demo recalculates with the real formula', async ({ page }) => {
  await page.goto('/how-it-works');
  const demo = page.locator('[data-score-demo]');
  const total = demo.locator('[data-total]');
  await expect(total).toHaveText('74');
  const permit = demo.getByRole('checkbox', { name: /Pre-sale prep permit/ });
  await permit.uncheck();
  // 7 + 13 + 13 = 33, two families, x1.15 = 37.95
  await expect(total).toHaveText('38');
  await expect(demo.locator('[data-tier-label]')).toHaveText('Monitor');
  await permit.check();
  await demo.getByRole('checkbox', { name: /STR license removed/ }).check();
  // 57.18 + 40 x 0.5^(45/90) x 0.9 = 82.64, four families, x1.45 = 119.8, capped at 100
  await expect(total).toHaveText('100');
  await expect(demo.locator('[data-ring]')).toHaveAttribute('aria-label', 'Score 100 out of 100, Immediate');
  for (const box of await demo.getByRole('checkbox').all()) await box.uncheck();
  await expect(total).toHaveText('0');
});

test('the hero shows its finished state under reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const states = await page.locator('.signal-stack .stack-row, .signal-stack .stack-result').evaluateAll((els) => els.map((e) => [getComputedStyle(e).opacity, e.getAnimations().length]));
  expect(states.length).toBe(5);
  for (const [opacity, animations] of states) { expect(opacity).toBe('1'); expect(animations).toBe(0); }
});

test('the mobile menu opens, closes with Escape and works without JavaScript', async ({ browser }) => {
  for (const javaScriptEnabled of [true, false]) {
    const page = await browser.newPage({ viewport: { width: 390, height: 800 }, javaScriptEnabled, baseURL: 'http://127.0.0.1:4321' });
    await page.goto('/');
    await page.locator('[data-mobile-nav] summary').click();
    await expect(page.getByRole('navigation', { name: 'Mobile' })).toBeVisible();
    if (javaScriptEnabled) {
      await page.keyboard.press('Escape');
      await expect(page.getByRole('navigation', { name: 'Mobile' })).toBeHidden();
    }
    await page.close();
  }
});
