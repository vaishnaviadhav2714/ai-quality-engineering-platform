import { AIProvider } from '../../providers/ai-provider';
import { testHealingPrompt } from '../../prompts/test-healing-prompt';
import { HealingContext, HealingProposal } from './types';
import { healingProposalSchema } from './validation';

export class TestHealer {
  constructor(private readonly provider: AIProvider) {}

  async proposeHealing(healingContext: HealingContext): Promise<HealingProposal> {
    const prompt = testHealingPrompt.replace(
      '{{healingContext}}',
      JSON.stringify(healingContext, null, 2),
    );

    const response = await this.provider.generate(prompt);

    const parsedResponse: unknown = JSON.parse(response);

    const validatedProposal = healingProposalSchema.parse(parsedResponse);

    return {
      ...validatedProposal,
      reviewStatus: 'pending',
    };
  }
}
