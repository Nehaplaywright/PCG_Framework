import { Page, Locator } from '@playwright/test';

export class LoginPage {
  // Locators
  private usernameInput: Locator;
  private passwordInput: Locator;
  private loginButton:   Locator;
  //private appLauncher:   Locator;

  constructor(private page: Page) {
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.loginButton   = page.locator('#Login');
    //this.appLauncher   = page.getByRole('button', { name: 'App Launcher' });
  }

  // Functions
  async goto() {
    // SF_LOGIN_URL = the Salesforce login page (my.salesforce.com)
    // SF_BASE_URL  = the Lightning app URL used after login (lightning.force.com)
    await this.page.goto(process.env.SF_LOGIN_URL ?? '');
  }

  // username and password are optional — falls back to .env values if not passed
  async login(username?: string, password?: string) {
    const user = username ?? process.env.SF_USERNAME ?? '';
    const pass = password ?? process.env.SF_PASSWORD ?? '';

    await this.usernameInput.fill(user);
    await this.loginButton.click();
    await this.passwordInput.fill(pass);
    await this.loginButton.click();
    await this.page.waitForLoadState('networkidle');
    //await this.appLauncher.waitFor({ state: 'visible' });
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }
}
