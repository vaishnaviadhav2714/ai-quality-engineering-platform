import { z } from 'zod';

export const generatedTestPlanSchema = z.object({
  tests: z
    .array(
      z.object({
        title: z.string().min(1),
        type: z.enum(['web', 'api']),
        description: z.string().min(1),
        sourceScenario: z.string().min(1),
        code: z.string().min(1),
      }),
    )
    .min(1, 'Generated test plan must contain at least one test'),
});
