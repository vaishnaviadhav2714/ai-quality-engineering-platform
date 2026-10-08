import { z } from 'zod';

export const qualityAnalysisSchema = z.object({
  area: z.enum(['security', 'performance', 'accessibility']),
  risk: z.enum(['high', 'medium', 'low']),
  summary: z.string().min(1),
  keyFindings: z.array(z.string().min(1)).min(1),
  recommendedActions: z.array(z.string().min(1)).min(1),
  confidence: z.enum(['high', 'medium', 'low']),
});
