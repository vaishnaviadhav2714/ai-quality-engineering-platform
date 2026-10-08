import { TestPlan } from './types';
import { TestPlanReview } from './review';

export function createPendingReview(testPlan: TestPlan): TestPlanReview {
  return {
    testPlan,
    status: 'pending',
  };
}
