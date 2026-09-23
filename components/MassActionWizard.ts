import { Page, expect } from '@playwright/test';

// MassActionCenterPage handles navigation to and within the Mass Action Center Lightning app
export class MassActionCenterPage {
  constructor(private page: Page) {}

  // Open Mass Action Center the same way a real user would — through the App Launcher (waffle icon)
  async navigateViaAppLauncher() {
    // Click the waffle icon in the top-left corner of the Salesforce toolbar
    await this.page.getByRole('button', { name: 'App Launcher' }).click();

    // Type "mass" to filter the app list, then select the correct tile
    await this.page.getByPlaceholder('Search apps and items...').fill('mass');

    // Use exact:true to avoid accidentally clicking "Mass Action Center Old"
    await this.page.getByRole('option', { name: 'Mass Action Center', exact: true }).click();

    // Wait for the page heading to confirm we arrived at the right place
    await expect(this.page.getByRole('heading', { name: 'Mass Action Center' })).toBeVisible();
  }

  // Navigate directly to the Mass Action Center URL — faster for tests that don't test the launcher flow
  async gotoDirect() {
    await this.page.goto('/lightning/n/Mass_Actions');
    await expect(this.page.getByRole('heading', { name: 'Mass Action Center' })).toBeVisible();
  }

  // Click one of the action tiles on the Mass Action Center landing page by its display name
  async openTile(tileName: string) {
    await this.page.getByRole('link', { name: tileName, exact: true }).click();
  }
}
