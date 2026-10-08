import { z } from 'zod';

export const exploratoryTestPlanSchema = z.object({
  suggestions: z
    .array(
      z.object({
        title: z.string().min(1),
        description: z.string().min(1),
        area: z.string().min(1),
        risk: z.enum(['high', 'medium', 'low']),
        priority: z.enum(['high', 'medium', 'low']),
      }),
    )
    .min(1, 'Exploratory plan must contain at least one suggestion'),
});
