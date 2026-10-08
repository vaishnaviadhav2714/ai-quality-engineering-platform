import { expect, test } from '../fixtures/api-fixtures';
import {
  productDetailsResponseSchema,
  productSearchResponseSchema,
} from '../schemas/product-response';
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

test('Get product API returns product details', async ({ productApiClient }) => {
  const response = await productApiClient.getProductById(PRODUCT_API_TEST_DATA.validProductId);

  expect(response.status()).toBe(200);

  const responseBody = productDetailsResponseSchema.parse(await response.json());

  expect(responseBody.status).toBe('success');
  expect(responseBody.data.id).toBe(PRODUCT_API_TEST_DATA.validProductId);
  expect(responseBody.data.name).toBe('Apple Juice (1000ml)');
});

test('Search products API returns results for another valid product', async ({
  productApiClient,
}) => {
  const response = await productApiClient.searchProducts(
    PRODUCT_API_TEST_DATA.anotherValidSearchTerm,
  );

  expect(response.status()).toBe(200);

  const responseBody = productSearchResponseSchema.parse(await response.json());

  expect(responseBody.status).toBe('success');
  expect(responseBody.data.length).toBeGreaterThan(0);
});

test('Search products API handles missing query parameter', async ({ productApiClient }) => {
  const response = await productApiClient.searchProductsWithoutQuery();

  expect(response.status()).toBe(200);

  const responseBody = productSearchResponseSchema.parse(await response.json());

  expect(responseBody.status).toBe('success');
  expect(responseBody.data).toBeInstanceOf(Array);
});

test('Get product API returns not found for an invalid product ID', async ({
  productApiClient,
}) => {
  const response = await productApiClient.getProductById(PRODUCT_API_TEST_DATA.invalidProductId);

  expect(response.status()).toBe(404);

  const responseBody = await response.json();

  expect(responseBody.message).toBe('Not Found');
});
