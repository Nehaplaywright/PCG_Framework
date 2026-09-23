import { Page, expect } from '@playwright/test';

// AccountPage handles interactions with a Salesforce Account record page.
// It focuses on the "WMO Information" section used to verify registration outcomes.
export class AccountPage {
  constructor(private page: Page) {}

  // Search for an account by name using the global search bar and open it
  async openByName(accountName: string) {
    // Click the search bar at the top of the Salesforce page
    await this.page.getByPlaceholder('Search...').click();
    await this.page.getByPlaceholder('Search...').fill(accountName);
    await this.page.keyboard.press('Enter');

    // Click the first matching link in the search results
    await this.page.getByRole('link', { name: accountName, exact: true }).first().click();

    // Confirm we landed on the right account record
    await expect(this.page.getByRole('heading', { name: accountName })).toBeVisible();
  }

  // Scroll to and expand the "WMO Information" section if it is currently collapsed
  private async expandWmoInformation() {
    const section = this.page.getByText('WMO Information', { exact: true });
    await section.scrollIntoViewIfNeeded();

    // aria-expanded="false" means the section is collapsed — click to open it
    const isCollapsed = await section.getAttribute('aria-expanded').catch(() => null) === 'false';
    if (isCollapsed) {
      await section.click();
    }
  }

  // Verify that the Registration fields inside WMO Information are correctly filled in.
  // `initiatedBy` is the display name of the user who triggered the registration.
  async expectRegistrationInitiated(initiatedBy: string) {
    await this.expandWmoInformation();

    // Find the Registration checkbox.
    // We exclude rows that mention "Status" or "Initiated" to get the plain "Registration" row.
    const registrationCheckbox = this.page
      .locator('records-record-layout-item', { hasText: 'Registration' })
      .filter({ hasNotText: 'Registration Status' })
      .filter({ hasNotText: 'Registration Initiated' })
      .getByRole('checkbox');

    // The checkbox must be ticked (registration was triggered)
    await expect(registrationCheckbox).toBeChecked();

    // The label and the user link must both be visible
    await expect(this.page.getByText('Registration Initiated By')).toBeVisible();
    await expect(this.page.getByRole('link', { name: initiatedBy })).toBeVisible();

    // The date/time field label must be visible
    await expect(this.page.getByText('Registration Initiated Date/Time')).toBeVisible();
  }
}
