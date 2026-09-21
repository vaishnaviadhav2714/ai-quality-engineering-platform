import { Locator, Page } from '@playwright/test';

export class AccountMenu {
  readonly accountButton: Locator;
  readonly loginMenuItem: Locator;
  readonly logoutMenuItem: Locator;

  constructor(private readonly page: Page) {
    this.accountButton = this.page
      .getByText('Account', {
        exact: true,
      })
      .last();

    this.loginMenuItem = this.page.getByRole('menuitem', {
      name: 'Go to login page',
    });

    this.logoutMenuItem = this.page.getByRole('menuitem', {
      name: 'Logout',
    });
  }

  async open() {
    await this.accountButton.click();
  }

  async goToLogin() {
    await this.loginMenuItem.click();
  }

  async logout() {
    await this.logoutMenuItem.click();
  }
}
