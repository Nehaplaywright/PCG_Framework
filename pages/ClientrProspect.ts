import { Page } from '@playwright/test';
import { LoginPage } from '../components/Loginpages';
import { MassActionCenterPage } from '../components/MassActionWizard';
import { AccountPage } from '../components/AccountPage';

// ClientProspectPage bundles all the pages needed for the Client/Prospect Registration workflow.
// Instead of calling components directly in every test, you use this class as a single entry point.
export class ClientProspectPage {
  loginPage: LoginPage;
  massActionCenterPage: MassActionCenterPage;
  accountPage: AccountPage;

  constructor(page: Page) {
    // Create one instance of each component and share the same browser page
    this.loginPage = new LoginPage(page);
    this.massActionCenterPage = new MassActionCenterPage(page);
    this.accountPage = new AccountPage(page);
  }

  // Full sign-in flow: open the login page, fill in credentials, wait for home page
  async signIn() {
    await this.loginPage.goto();
    await this.loginPage.login();
  }

  // Navigate to the Client/Prospect Registration tile inside Mass Action Center
  async openClientProspectRegistration() {
    await this.massActionCenterPage.gotoDirect();
    await this.massActionCenterPage.openTile('Client/Prospect Registration');
  }
}
