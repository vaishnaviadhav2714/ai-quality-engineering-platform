import { Locator, Page } from '@playwright/test';
import { SearchBar } from '../components/search-bar';

export class HomePage {
  readonly welcomeCloseButton: Locator;
  readonly pageHeading: Locator;
  readonly searchBar: SearchBar;

  constructor(private readonly page: Page) {
    this.welcomeCloseButton = this.page.getByRole('button', {
      name: 'Close Welcome Banner',
    });

    this.pageHeading = this.page.getByRole('heading', {
      name: 'Welcome to OWASP Juice Shop!',
    });

    this.searchBar = new SearchBar(this.page);
  }

  async open() {
    await this.page.goto('/');

    await this.welcomeCloseButton.click();
  }
}
