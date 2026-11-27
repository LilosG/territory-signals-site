import { expect, test } from '@playwright/test';

test('empty submit shows an accessible error summary and field errors', async ({ page }) => {
  await page.goto('/request');
  await page.getByRole('button', { name: 'Request a territory walkthrough' }).click();
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
