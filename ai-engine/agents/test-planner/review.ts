import { TestPlan } from './types';

export interface TestPlanReview {
  testPlan: TestPlan;
  status: 'pending' | 'approved' | 'rejected';
  reviewedBy?: string;
  comments?: string;
}
