import type { ProviderDefinition, ProviderId } from "./provider.types";

/**
 * UzCode AI — Provider Registry
 * Static metadata catalog only. No ProviderAdapter is implemented or
 * instantiated anywhere here — this is the architecture the future
 * per-provider adapters will register into.
 */
export const providerRegistry: Record<ProviderId, ProviderDefinition> = {
  anthropic: { id: "anthropic", label: "Anthropic", requiresApiKey: true, supportsCustomBaseUrl: false, isLocal: false },
  openai: { id: "openai", label: "OpenAI", requiresApiKey: true, supportsCustomBaseUrl: false, isLocal: false },
  gemini: { id: "gemini", label: "Google Gemini", requiresApiKey: true, supportsCustomBaseUrl: false, isLocal: false },
  deepseek: { id: "deepseek", label: "DeepSeek", requiresApiKey: true, supportsCustomBaseUrl: false, isLocal: false },
  openrouter: { id: "openrouter", label: "OpenRouter", requiresApiKey: true, supportsCustomBaseUrl: false, isLocal: false },
  ollama: { id: "ollama", label: "Ollama (Local)", requiresApiKey: false, supportsCustomBaseUrl: true, isLocal: true },
  "azure-openai": { id: "azure-openai", label: "Azure OpenAI", requiresApiKey: true, supportsCustomBaseUrl: true, isLocal: false },
  custom: { id: "custom", label: "Custom Provider", requiresApiKey: false, supportsCustomBaseUrl: true, isLocal: false },
};

export function getProvider(id: ProviderId): ProviderDefinition {
  return providerRegistry[id];
}

export function listProviders(): ProviderDefinition[] {
  return Object.values(providerRegistry);
}
