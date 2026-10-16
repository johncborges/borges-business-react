import { defineConfig, devices } from '@playwright/test';

const PORT = 4173;

/**
 * End-to-end tests run against the production build served by `vite preview`.
 * The form key is a dummy: every test that submits the form intercepts the Web3Forms request.
 */
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'phone', use: { ...devices['Pixel 7'] } },
  ],
  webServer: {
    command: `vite build --outDir dist-e2e && vite preview --outDir dist-e2e --port ${PORT} --strictPort`,
    url: `http://localhost:${PORT}`,
    env: { VITE_WEB3FORMS_KEY: 'e2e-test-key' },
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
