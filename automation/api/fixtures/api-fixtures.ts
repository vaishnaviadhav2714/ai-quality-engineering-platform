import { test as base } from '@playwright/test';
import { AuthApiClient } from '../clients/auth-api-client';
import { ProductApiClient } from '../clients/product-api-client';

type ApiFixtures = {
  productApiClient: ProductApiClient;
  authApiClient: AuthApiClient;
};

export const test = base.extend<ApiFixtures>({
  productApiClient: async ({ request }, use) => {
    await use(new ProductApiClient(request));
  },

  authApiClient: async ({ request }, use) => {
    await use(new AuthApiClient(request));
  },
});

export { expect } from '@playwright/test';
