import { Locator, Page } from '@playwright/test';

export class SearchPage {
  readonly appleJuiceProduct: Locator;
  readonly applePomaceProduct: Locator;

  constructor(private readonly page: Page) {
    this.appleJuiceProduct = this.page.getByText('Apple Juice (1000ml)', {
      exact: true,
    });

    this.applePomaceProduct = this.page.getByText('Apple Pomace', {
      exact: true,
    });
  }
}
