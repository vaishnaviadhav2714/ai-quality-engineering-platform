import { z } from 'zod';

export const requirementAnalysisSchema = z.object({
  functionalRequirements: z.array(z.string()),
  edgeCases: z.array(z.string()),
  risks: z.array(z.string()),
  missingRequirements: z.array(z.string()),
});
