import { defineConfig } from '@playwright/test';

// Locally this uses the installed Chrome; in CI, Playwright's own Chromium (`npx playwright install chromium`).
const channel = process.env.CI ? undefined : 'chrome';

export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: { baseURL: 'http://localhost:4390', channel },
  webServer: { command: 'node scripts/serve.mjs', url: 'http://localhost:4390', reuseExistingServer: !process.env.CI, timeout: 60_000 },
  projects: [
    { name: 'desktop', use: { viewport: { width: 1440, height: 900 } } },
    { name: 'phone', use: { viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true, deviceScaleFactor: 2 } },
  ],
});
