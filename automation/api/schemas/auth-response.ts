import { z } from 'zod';

export const authenticationResponseSchema = z.object({
  authentication: z.object({
    token: z.string().min(1),
    bid: z.number(),
    umail: z.string().min(1),
  }),
});
