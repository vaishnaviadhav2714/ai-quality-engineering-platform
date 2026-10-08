import { z } from 'zod';

export const testPlanSchema = z.object({
  scenarios: z
    .array(
      z.object({
        title: z.string(),
        description: z.string(),
        type: z.enum(['positive', 'negative', 'edge']),
        priority: z.enum(['high', 'medium', 'low']),
      }),
    )
    .min(1, 'Test plan must contain at least one scenario'),

  apiCoverage: z.array(
    z.object({
      api: z.string(),
      endpoint: z.string(),
      method: z.string(),
      parameters: z.record(z.string(), z.string()).optional(),
    }),
  ),

  uiCoverage: z.array(
    z.object({
      uiElement: z.string(),
      description: z.string(),
    }),
  ),

  securityNeeds: z.array(
    z.object({
      need: z.string(),
      description: z.string(),
    }),
  ),

  performanceNeeds: z.array(
    z.object({
      need: z.string(),
      description: z.string(),
    }),
  ),
});
