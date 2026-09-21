import { APIRequestContext } from '@playwright/test';

export class ProductApiClient {
  constructor(private readonly request: APIRequestContext) {}

  async searchProducts(searchTerm: string) {
    return this.request.get('/rest/products/search', {
      params: {
        q: searchTerm,
      },
    });
  }

  async getProductById(productId: number) {
    return this.request.get(`/api/Products/${productId}`);
  }
}
