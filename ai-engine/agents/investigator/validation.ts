import { z } from 'zod';

export const failureInvestigationSchema = z.object({
  category: z.enum(['application', 'test', 'environment', 'data', 'network', 'unknown']),
  likelyCause: z.string().min(1),
  confidence: z.enum(['high', 'medium', 'low']),
  recommendedAction: z.string().min(1),
  evidenceSummary: z.string().min(1),
});
