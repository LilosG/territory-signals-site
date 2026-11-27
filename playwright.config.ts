import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
  reporter: [['list']],
  use: { baseURL: 'http://127.0.0.1:4321', ...devices['Desktop Chrome'] },
  webServer: { command: 'npx wrangler dev --ip 127.0.0.1 --port 4321 --log-level warn', url: 'http://127.0.0.1:4321/robots.txt', reuseExistingServer: false, timeout: 120_000 },
});
