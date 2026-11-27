import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('empty submit shows an accessible error summary and field errors', async ({ page }) => {
  await page.goto('/request');
  await page.getByRole('button', { name: 'Book a territory walkthrough' }).click();
  const summary = page.locator('[data-error-summary]');
  await expect(summary).toBeVisible();
  await expect(summary).toBeFocused();
  await expect(page.locator('#email')).toHaveAttribute('aria-invalid', 'true');
  await expect(page.locator('#email')).toHaveAttribute('aria-describedby', 'email-error');
  await summary.getByRole('link', { name: /name\.$/ }).first().click();
  await expect(page.locator('#name')).toBeFocused();
});

test('the endpoint validates, ignores the honeypot and rejects other methods', async ({ request, baseURL }) => {
  const headers = { Accept: 'application/json', Origin: baseURL! };
  const bad = await request.post('/api/request', { form: { name: 'x' }, headers });
  expect(bad.status()).toBe(422);
  expect(bad.headers()['x-robots-tag']).toBe('noindex');
  const trap = await request.post('/api/request', { form: { website: 'spam' }, headers: { Origin: baseURL! }, maxRedirects: 0 });
  expect(trap.status()).toBe(303);
  expect(trap.headers()['location']).toBe('/request/thanks');
  expect((await request.get('/api/request')).status()).toBe(405);
});

test('error and open-menu states have no accessibility violations', async ({ page }) => {
  const scan = async () => (await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze()).violations.map((v) => v.id);
  await page.goto('/request');
  await page.getByRole('button', { name: 'Book a territory walkthrough' }).click();
  expect(await scan()).toEqual([]);
  await page.setViewportSize({ width: 390, height: 800 });
  await page.goto('/');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.locator('[data-mobile-nav] summary').click();
  expect(await scan()).toEqual([]);
});

test('the form submits with valid fields and surfaces a server error without losing input', async ({ page }) => {
  await page.goto('/request');
  await page.getByLabel('Name', { exact: true }).fill('Alex Agent');
  await page.getByLabel('Work email').fill('alex@example.com');
  await page.getByLabel('Team or brokerage').fill('Demo Team');
  await page.getByLabel('Market or neighborhoods').fill('Sample Area');
  await page.getByLabel('Team size').selectOption('2–5');
  await page.route('**/api/request', (route) => route.fulfill({ status: 502, contentType: 'application/json', body: JSON.stringify({ ok: false, message: 'Your request could not be sent.' }) }));
  await page.getByRole('button', { name: 'Book a territory walkthrough' }).click();
  await expect(page.locator('[data-error-summary]')).toContainText('could not be sent');
  await expect(page.getByLabel('Work email')).toHaveValue('alex@example.com');
  await page.unroute('**/api/request');
  await page.route('**/api/request', (route) => route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' }));
  await page.getByRole('button', { name: 'Book a territory walkthrough' }).click();
  await expect(page).toHaveURL(/\/request\/thanks$/);
});
