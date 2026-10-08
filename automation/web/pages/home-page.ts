import { Locator, Page } from '@playwright/test';
import { SearchBar } from '../components/search-bar';
import { clickWithRecovery } from '../self-healing/locator-recovery';

export class HomePage {
  readonly welcomeCloseButton: Locator;
  readonly welcomeCloseButtonFallback: Locator;
  readonly pageHeading: Locator;
  readonly searchBar: SearchBar;

  constructor(private readonly page: Page) {
    this.welcomeCloseButton = this.page.getByRole('button', {
      name: 'Close Welcome Banner',
    });

    this.welcomeCloseButtonFallback = this.page.locator(
      'button[aria-label="Close Welcome Banner"]',
    );

    this.pageHeading = this.page.getByRole('heading', {
      name: 'Welcome to OWASP Juice Shop!',
    });

    this.searchBar = new SearchBar(this.page);
  }

  async open() {
    await this.page.goto('/');

    await clickWithRecovery(this.welcomeCloseButton, this.welcomeCloseButtonFallback);
  }
}
