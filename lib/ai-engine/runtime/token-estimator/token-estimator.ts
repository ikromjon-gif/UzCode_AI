import { getModel } from "../../models/model-registry";
import type { TokenEstimate } from "./token-estimator.types";

/**
 * UzCode AI — Token Estimator
 * No tokenizer library — uses the common ~4-characters-per-token
 * English-text heuristic. This is an approximation, not the real
 * count a provider's tokenizer would produce; label it as such
 * anywhere it's surfaced to a person.
 */
const CHARS_PER_TOKEN_ESTIMATE = 4;
/** Rough assumption for an unsent reply, since no real response exists yet to measure. */
const ASSUMED_OUTPUT_TOKENS = 512;

function estimateTokensFromChars(charCount: number): number {
  return Math.ceil(charCount / CHARS_PER_TOKEN_ESTIMATE);
}

export function estimateTokens(promptCharLength: number, contextCharLength: number, modelId: string): TokenEstimate {
  const inputTokens = estimateTokensFromChars(promptCharLength);
  const contextTokens = estimateTokensFromChars(contextCharLength);
  const outputTokens = ASSUMED_OUTPUT_TOKENS;
  const totalTokens = inputTokens + contextTokens + outputTokens;

  const model = getModel(modelId);
  const estimatedCostUsd = model
    ? ((inputTokens + contextTokens) / 1_000_000) * model.pricing.inputPerMillionTokens +
      (outputTokens / 1_000_000) * model.pricing.outputPerMillionTokens
    : 0;

  const withinContextWindow = model ? totalTokens <= model.contextWindow : true;

  return { inputTokens, outputTokens, contextTokens, totalTokens, estimatedCostUsd, withinContextWindow };
}
