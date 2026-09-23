import { test as base } from '@playwright/test';
import { LoginPage } from '../components/Loginpages';
import { AccountPage } from '../components/AccountPage';
import { MassActionCenterPage } from '../components/MassActionWizard';

// Define the names and types for our custom fixtures
type MyFixtures = {
  loginPage: LoginPage;
  accountPage: AccountPage;
  massActionCenterPage: MassActionCenterPage;
};

// Extend Playwright's built-in `test` with our custom page object fixtures.
// Any test that imports `test` from this file automatically gets pre-built page objects.
// No need to manually write `new LoginPage(page)` inside every test.
export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  accountPage: async ({ page }, use) => {
    await use(new AccountPage(page));
  },

  massActionCenterPage: async ({ page }, use) => {
    await use(new MassActionCenterPage(page));
  },
});

// Re-export `expect` so test files only need a single import line
export { expect } from '@playwright/test';
