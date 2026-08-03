import type { AiConfiguration } from "./ai-config.types";

/** UzCode AI — Default AI configuration. In-memory default only — no persistence. */
export const defaultAiConfig: AiConfiguration = {
  providerId: "anthropic",
  modelId: "claude-model-large",
  temperature: 0.7,
  topP: 1,
  maxTokens: 4096,
  reasoningLevel: "medium",
  streaming: true,
  vision: true,
  toolCalling: true,
};
