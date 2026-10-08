import { APIRequestContext } from '@playwright/test';

export class AuthApiClient {
  constructor(private readonly request: APIRequestContext) {}

  async login(email: string, password: string) {
    return this.request.post('/rest/user/login', {
      data: {
        email,
        password,
      },
    });
  }
}
