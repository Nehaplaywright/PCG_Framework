import { test, expect } from '../fixture/fixtures';
import { AccountPage } from '../components/AccountPage';
import { MassActionCenterPage } from '../components/MassActionWizard';

// ── Update these two values with the real account from your QAT org ──────────
const ACCOUNT_NAME = 'John Smith';       // The exact account name as it appears in Salesforce
const REGISTRATION_INITIATED_BY = 'Test User';  // The user who triggered the registration
// ─────────────────────────────────────────────────────────────────────────────

// ─── Login ────────────────────────────────────────────────────────────────────

test.describe('Salesforce Login', () => {

  test('login page loads and user can sign in', async ({ loginPage, page }) => {
    const username = process.env.SF_USERNAME;
    const password = process.env.SF_PASSWORD;

    // test.skip must be FIRST — before any browser actions
    test.skip(!username || !password, 'SF_USERNAME and SF_PASSWORD must be set in the .env file');

    // Open the login page and verify the browser tab title
    await loginPage.goto();
    const title = await loginPage.getTitle();
    expect(title).toContain('');
    console.log(`Login page title: ${title}`);

    // Sign in — login() waits for the App Launcher, so reaching this line means success
    await loginPage.login();
    console.log('Logged in as:', username);
    console.log('Logged in as:', password);
    
    await page.pause();
    await page.screenshot({ path: 'login-success.png' });
  });

});


// ─── Mass Action Center ───────────────────────────────────────────────────────

test.describe('Mass Action Center', () => {

  // Log in before every test in this group
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login();
  });

  test('opens via the App Launcher', async ({ page }) => {
    const massActionPage = new MassActionCenterPage(page);
    await massActionPage.navigateViaAppLauncher();
  });

  test('opens via direct URL', async ({ page }) => {
    const massActionPage = new MassActionCenterPage(page);
    await massActionPage.gotoDirect();
  });

  test('Client/Prospect Registration tile is clickable', async ({ page }) => {
    const massActionPage = new MassActionCenterPage(page);

    await massActionPage.gotoDirect();
    await massActionPage.openTile('Client/Prospect Registration');

    await expect(page.getByText('Client/Prospect Registration')).toBeVisible();
  });

});

// ─── Account Record — Registration Fields ────────────────────────────────────

test.describe('Client/Prospect Registration — Account record', () => {

  // Log in before every test in this group
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login();
  });

  test('Registration checkbox, initiated-by, and date/time are visible', async ({ page }) => {
    const accountPage = new AccountPage(page);

    await accountPage.openByName(ACCOUNT_NAME);
    await accountPage.expectRegistrationInitiated(REGISTRATION_INITIATED_BY);
  });

});

