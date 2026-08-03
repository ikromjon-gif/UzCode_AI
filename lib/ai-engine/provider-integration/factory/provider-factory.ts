import type { ProviderAdapter, ProviderId } from "../../providers/provider.types";
import { providerRegistry, getProvider } from "../../providers/provider-registry";
import {
  AnthropicAdapter,
  OpenAiAdapter,
  GeminiAdapter,
  DeepSeekAdapter,
  OpenRouterAdapter,
  OllamaAdapter,
  AzureOpenAiAdapter,
  CustomAdapter,
} from "../adapters";

/**
 * UzCode AI — Provider Factory
 * Instantiates and resolves adapters. No networking — "create" just
 * means `new SomeAdapter()`. Custom adapters registered via
 * registerProvider() live in an in-memory Map only (no persistence).
 */
type AdapterConstructor = new () => ProviderAdapter;

const builtInAdapters: Record<Exclude<ProviderId, "custom">, AdapterConstructor> = {
  anthropic: AnthropicAdapter,
  openai: OpenAiAdapter,
  gemini: GeminiAdapter,
  deepseek: DeepSeekAdapter,
  openrouter: OpenRouterAdapter,
  ollama: OllamaAdapter,
  "azure-openai": AzureOpenAiAdapter,
};

const registeredCustomAdapters = new Map<string, ProviderAdapter>();

export function createProvider(providerId: ProviderId): ProviderAdapter {
  if (providerId === "custom") {
    throw new Error("Custom providers must be registered via registerProvider(id, adapter) before use.");
  }
  const AdapterClass = builtInAdapters[providerId];
  return new AdapterClass();
}

/** Registers a custom (or override) adapter instance by an arbitrary string id. */
export function registerProvider(id: string, adapter: ProviderAdapter): void {
  registeredCustomAdapters.set(id, adapter);
}

export function resolveProvider(providerId: ProviderId | string): ProviderAdapter | undefined {
  if (registeredCustomAdapters.has(providerId)) {
    return registeredCustomAdapters.get(providerId);
  }
  if (providerId === "custom") {
    return new CustomAdapter();
  }
  if (isKnownProviderId(providerId)) {
    return createProvider(providerId);
  }
  return undefined;
}

export function validateProvider(providerId: string): boolean {
  return isKnownProviderId(providerId) || registeredCustomAdapters.has(providerId);
}

function isKnownProviderId(id: string): id is ProviderId {
  return id in providerRegistry;
}

export { getProvider as getProviderMetadata };
