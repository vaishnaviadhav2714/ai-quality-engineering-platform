export type ReviewStatus = 'pending' | 'approved' | 'rejected';

export interface ExploratorySuggestion {
  title: string;
  description: string;
  area: string;
  risk: 'high' | 'medium' | 'low';
  priority: 'high' | 'medium' | 'low';
  reviewStatus: ReviewStatus;
}

export interface ExploratoryTestPlan {
  suggestions: ExploratorySuggestion[];
}
