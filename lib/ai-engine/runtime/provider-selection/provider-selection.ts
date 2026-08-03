import { ProviderManager } from "../../provider-integration";
import { getModel, getModelsByProvider } from "../../models/model-registry";
import type { ProviderId } from "../../providers/provider.types";
import type { ModelCapabilities } from "../../models/model.types";

export interface ProviderSelectionCriteria {
  preferredProviderId: ProviderId;
  preferredModelId: string;
  requiredCapabilities?: Partial<ModelCapabilities>;
}

export interface ProviderSelectionResult {
  providerId: ProviderId;
  modelId: string;
  usedFallback: boolean;
  valid: boolean;
  reason?: string;
}

const providerManager = new ProviderManager();

/**
 * UzCode AI — Provider Selection
 * Built entirely on Sprint 10's ProviderManager + model registry —
 * no new networking, no new state. Falls back through
 * ProviderManager.getFallbackProvider() (itself a static placeholder
 * chain) when the preferred model can't satisfy required capabilities.
 */
export function selectProvider(criteria: ProviderSelectionCriteria): ProviderSelectionResult {
  const model = getModel(criteria.preferredModelId);

  if (model && matchesCapabilities(model.capabilities, criteria.requiredCapabilities)) {
    return { providerId: criteria.preferredProviderId, modelId: criteria.preferredModelId, usedFallback: false, valid: true };
  }

  const fallbackProviderId = providerManager.getFallbackProvider(criteria.preferredProviderId);
  if (!fallbackProviderId) {
    return { providerId: criteria.preferredProviderId, modelId: criteria.preferredModelId, usedFallback: false, valid: false, reason: "No model satisfies the required capabilities and no fallback provider is configured." };
  }

  const fallbackModel = getModelsByProvider(fallbackProviderId).find((m) => matchesCapabilities(m.capabilities, criteria.requiredCapabilities));
  if (!fallbackModel) {
    return { providerId: fallbackProviderId, modelId: criteria.preferredModelId, usedFallback: true, valid: false, reason: "Fallback provider has no model satisfying the required capabilities." };
  }

  return { providerId: fallbackProviderId, modelId: fallbackModel.id, usedFallback: true, valid: true };
}

function matchesCapabilities(available: ModelCapabilities, required?: Partial<ModelCapabilities>): boolean {
  if (!required) return true;
  return Object.entries(required).every(([key, value]) => !value || available[key as keyof ModelCapabilities] === value);
}

export { providerManager };
