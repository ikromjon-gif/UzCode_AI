import { listProviders, getProvider } from "../../providers/provider-registry";
import type { ProviderDefinition, ProviderId } from "../../providers/provider.types";
import { resolveProvider, validateProvider } from "../factory/provider-factory";
import type { ProviderAdapter } from "../../providers/provider.types";
import type { ProviderHealth } from "./provider-manager.types";

/**
 * UzCode AI — Provider Manager
 * Stateless orchestration — deliberately does NOT hold its own copy
 * of "current provider/model" (Sprint 9's ai-store already owns that
 * as the canonical UI-facing state; duplicating it here was flagged
 * as a state-consistency risk in the Sprint 8 architecture review).
 * Every method takes the provider/model it needs to know about as a
 * parameter instead.
 */
export class ProviderManager {
  getAvailableProviders(): ProviderDefinition[] {
    return listProviders();
  }

  getProviderMetadata(providerId: ProviderId): ProviderDefinition {
    return getProvider(providerId);
  }

  resolveAdapter(providerId: ProviderId): ProviderAdapter | undefined {
    return resolveProvider(providerId);
  }

  isProviderAvailable(providerId: string): boolean {
    return validateProvider(providerId);
  }

  /**
   * Placeholder — always resolves "unknown". A future sprint would
   * make a real (lightweight) request to confirm connectivity/auth.
   */
  async checkHealth(providerId: ProviderId): Promise<ProviderHealth> {
    return { providerId, status: "unknown", checkedAt: new Date().toISOString() };
  }

  /**
   * Placeholder — returns a fixed, illustrative fallback chain rather
   * than any real availability-based decision.
   */
  getFallbackProvider(providerId: ProviderId): ProviderId | null {
    const fallbackChain: Partial<Record<ProviderId, ProviderId>> = {
      anthropic: "openai",
      openai: "anthropic",
      gemini: "openai",
      deepseek: "openrouter",
      openrouter: "anthropic",
      "azure-openai": "openai",
    };
    return fallbackChain[providerId] ?? null;
  }
}
