import { test as base } from '@playwright/test';
import { ProductApiClient } from '../clients/product-api-client';

type ApiFixtures = {
  productApiClient: ProductApiClient;
};

export const test = base.extend<ApiFixtures>({
  productApiClient: async ({ request }, use) => {
    await use(new ProductApiClient(request));
  },
});

export { expect } from '@playwright/test';
