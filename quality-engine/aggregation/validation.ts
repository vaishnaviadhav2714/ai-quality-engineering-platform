import { z } from 'zod';

export const qualityMetricSchema = z.object({
  area: z.enum(['automation', 'security', 'performance', 'accessibility']),

  tool: z.string().min(1),

  status: z.enum(['passed', 'warning', 'failed']),

  summary: z.string().min(1),

  score: z.number().min(0).max(100).optional(),
});

export const qualityIntelligenceSchema = z.object({
  summary: z.string().min(1),

  keyRisks: z.array(z.string().min(1)),

  recommendedActions: z.array(z.string().min(1)),

  confidence: z.enum(['high', 'medium', 'low']),
});

export const qualitySnapshotSchema = z.object({
  application: z.string().min(1),

  timestamp: z.string().datetime(),

  metrics: z.array(qualityMetricSchema),

  overallStatus: z.enum(['passed', 'warning', 'failed']),

  overallScore: z.number().min(0).max(100),

  intelligence: qualityIntelligenceSchema.optional(),
});
