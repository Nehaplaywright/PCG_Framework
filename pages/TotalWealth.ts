import { Page, expect } from '@playwright/test';

// TotalWealthPage is a placeholder for the Total Wealth workflow.
// Add methods here as the Total Wealth feature tests are built out.
export class TotalWealthPage {
  constructor(private page: Page) {}

  // Navigate directly to the Total Wealth Lightning page
  async goto() {
    await this.page.goto('/lightning/n/Total_Wealth');
    await expect(this.page.getByRole('heading', { name: 'Total Wealth' })).toBeVisible();
  }
}
