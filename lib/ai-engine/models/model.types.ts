import type { ProviderId } from "../providers/provider.types";

/**
 * UzCode AI — Model Layer types
 * Pure metadata — capability flags, context window, pricing. No
 * request is ever built or sent from this shape.
 */
export interface ModelCapabilities {
  vision: boolean;
  reasoning: boolean;
  toolCalling: boolean;
  streaming: boolean;
}

export interface ModelPricing {
  /** USD per 1M input tokens. Illustrative — not read from any live source. */
  inputPerMillionTokens: number;
  /** USD per 1M output tokens. Illustrative — not read from any live source. */
  outputPerMillionTokens: number;
}

export interface ModelDefinition {
  id: string;
  providerId: ProviderId;
  label: string;
  contextWindow: number;
  capabilities: ModelCapabilities;
  pricing: ModelPricing;
}
