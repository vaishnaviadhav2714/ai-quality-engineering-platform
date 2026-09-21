import { Locator, Page } from '@playwright/test';

export class SearchBar {
  readonly searchButton: Locator;
  readonly searchInput: Locator;

  constructor(private readonly page: Page) {
    this.searchButton = this.page.getByRole('button', {
      name: 'Open search',
    });

    this.searchInput = this.page.getByRole('textbox');
  }

  async open() {
    await this.searchButton.click();
  }

  async searchFor(searchTerm: string) {
    await this.searchInput.fill(searchTerm);
  }
}
