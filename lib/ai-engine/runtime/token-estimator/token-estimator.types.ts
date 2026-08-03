export interface TokenEstimate {
  inputTokens: number;
  outputTokens: number;
  contextTokens: number;
  totalTokens: number;
  estimatedCostUsd: number;
  withinContextWindow: boolean;
}
