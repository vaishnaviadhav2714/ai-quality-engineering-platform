import { z } from 'zod';

export const healingProposalSchema = z.object({
  changeType: z.enum(['locator', 'test-data', 'unknown']),
  explanation: z.string().min(1),
  proposedCode: z.string().min(1),
  confidence: z.enum(['high', 'medium', 'low']),
});
