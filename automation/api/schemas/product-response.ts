import { z } from 'zod';

export const productSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
});

export const productSearchResponseSchema = z.object({
  status: z.string(),
  data: z.array(productSchema),
});

export type Product = z.infer<typeof productSchema>;

export type ProductSearchResponse = z.infer<typeof productSearchResponseSchema>;
