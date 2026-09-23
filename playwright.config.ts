import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// Load variables from the .env file into process.env so all tests can read them
dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  // Folder where Playwright looks for test files
  testDir: './tests',

  // Run all tests in parallel (disabled on CI to avoid resource issues)
  fullyParallel: true,

  // On CI: fail the build if someone accidentally left a test.only in the code
  forbidOnly: !!process.env.CI,

  // On CI: retry a failing test twice before marking it as failed
  retries: process.env.CI ? 2 : 0,

  // On CI: run one test at a time to avoid overloading the machine
  workers: process.env.CI ? 2 : undefined,

  // HTML report goes to playwright-report/ (separate from test-results/ to avoid conflicts)
  reporter: 'html',

  // Folder where Playwright saves screenshots, videos, and traces
  outputDir: 'test-results',

  use: {
    // Base URL for all page.goto() calls — override with the SF_BASE_URL env var if needed
    baseURL: process.env.SF_BASE_URL ?? 'Nothing',

    // Run headed locally, headless on CI
    headless: !!process.env.CI,

    // Take a screenshot automatically when a test fails — saved to test-results/
    screenshot: 'only-on-failure',

    // Record a video when a test fails — saved to test-results/
    video: 'retain-on-failure',

    // Save a trace file when a test is retried — useful for debugging failures
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
