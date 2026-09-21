import { expect, test } from '../fixtures/api-fixtures';
import { productSearchResponseSchema } from '../schemas/product-response';
import { PRODUCT_API_TEST_DATA } from '../test-data/product-test-data';

test('Search products API returns matching products', async ({ productApiClient }) => {
  const response = await productApiClient.searchProducts(PRODUCT_API_TEST_DATA.validSearchTerm);

  expect(response.status()).toBe(200);

  const responseBody = productSearchResponseSchema.parse(await response.json());

  expect(responseBody.status).toBe('success');
  expect(responseBody.data.length).toBeGreaterThan(0);
  expect(responseBody.data[0].name).toContain('Apple');
  expect(responseBody.data[0].id).toBeGreaterThan(0);
});

test('Search products API returns no products for an unknown search term', async ({
  productApiClient,
}) => {
  const response = await productApiClient.searchProducts(PRODUCT_API_TEST_DATA.unknownSearchTerm);

  expect(response.status()).toBe(200);

  const responseBody = productSearchResponseSchema.parse(await response.json());

  expect(responseBody.status).toBe('success');
  expect(responseBody.data).toHaveLength(0);
});

test('Get product API returns not found for an invalid product ID', async ({
  productApiClient,
}) => {
  const response = await productApiClient.getProductById(999999);

  expect(response.status()).toBe(404);

  const responseBody = await response.json();

  expect(responseBody.message).toBe('Not Found');
});
