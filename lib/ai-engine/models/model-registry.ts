import type { ModelDefinition } from "./model.types";

/**
 * UzCode AI — Model Registry
 * Illustrative example catalog — one or two representative entries
 * per provider so the shape can be exercised. Values are approximate
 * and not sourced from any live pricing/spec API; a future sprint
 * replaces or refreshes this catalog when a provider is actually
 * integrated. Azure OpenAI reuses OpenAI-shaped entries (same model
 * family, different endpoint); Custom starts empty by definition.
 */
export const modelRegistry: ModelDefinition[] = [
  {
    id: "claude-model-large",
    providerId: "anthropic",
    label: "Claude (Large)",
    contextWindow: 200_000,
    capabilities: { vision: true, reasoning: true, toolCalling: true, streaming: true },
    pricing: { inputPerMillionTokens: 15, outputPerMillionTokens: 75 },
  },
  {
    id: "gpt-model-large",
    providerId: "openai",
    label: "GPT (Large)",
    contextWindow: 128_000,
    capabilities: { vision: true, reasoning: true, toolCalling: true, streaming: true },
    pricing: { inputPerMillionTokens: 10, outputPerMillionTokens: 30 },
  },
  {
    id: "gemini-model-pro",
    providerId: "gemini",
    label: "Gemini (Pro)",
    contextWindow: 1_000_000,
    capabilities: { vision: true, reasoning: true, toolCalling: true, streaming: true },
    pricing: { inputPerMillionTokens: 7, outputPerMillionTokens: 21 },
  },
  {
    id: "deepseek-model-chat",
    providerId: "deepseek",
    label: "DeepSeek Chat",
    contextWindow: 64_000,
    capabilities: { vision: false, reasoning: true, toolCalling: true, streaming: true },
    pricing: { inputPerMillionTokens: 1, outputPerMillionTokens: 2 },
  },
  {
    id: "openrouter-auto",
    providerId: "openrouter",
    label: "Auto (best available)",
    contextWindow: 128_000,
    capabilities: { vision: false, reasoning: false, toolCalling: true, streaming: true },
    pricing: { inputPerMillionTokens: 0, outputPerMillionTokens: 0 },
  },
  {
    id: "ollama-local-model",
    providerId: "ollama",
    label: "Local Model",
    contextWindow: 32_000,
    capabilities: { vision: false, reasoning: false, toolCalling: false, streaming: true },
    pricing: { inputPerMillionTokens: 0, outputPerMillionTokens: 0 },
  },
];

export function getModelsByProvider(providerId: string): ModelDefinition[] {
  return modelRegistry.filter((m) => m.providerId === providerId);
}

export function getModel(id: string): ModelDefinition | undefined {
  return modelRegistry.find((m) => m.id === id);
}
