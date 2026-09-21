import { Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(private readonly page: Page) {
    this.emailInput = this.page.getByLabel('Email');

    this.passwordInput = this.page.getByRole('textbox', {
      name: 'Text field for the login password',
    });

    this.loginButton = this.page.getByText('Log in', { exact: true });
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
