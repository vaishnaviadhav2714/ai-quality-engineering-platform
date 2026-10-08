import { expect, test } from '../fixtures/api-fixtures';
import { AUTH_API_TEST_DATA } from '../test-data/auth-test-data';
import { authenticationResponseSchema } from '../schemas/auth-response';

test('Login API rejects invalid credentials', async ({ authApiClient }) => {
  const response = await authApiClient.login(
    AUTH_API_TEST_DATA.invalidEmail,
    AUTH_API_TEST_DATA.invalidPassword,
  );

  expect(response.status()).toBe(401);
});

test('Login API returns authentication token for valid credentials', async ({ authApiClient }) => {
  const response = await authApiClient.login(
    process.env.TEST_USER_EMAIL ?? '',
    process.env.TEST_USER_PASSWORD ?? '',
  );

  expect(response.status()).toBe(200);

  const responseBody = authenticationResponseSchema.parse(await response.json());

  expect(responseBody.authentication.token).toBeTruthy();
});
