import { parseResponse } from "../../provider-integration";
import type { UnifiedResponse } from "../../provider-integration";
import type { ProviderId } from "../../providers/provider.types";

/**
 * UzCode AI — Response Pipeline (runtime layer)
 * Thin wrapper over Sprint 10's parseResponse — Sprint 10 already
 * unifies text/usage/finishReason across providers; this layer adds
 * the post-processing step (trim/normalize whitespace) and exposes
 * toolCalls/reasoning explicitly as "placeholder" fields, matching
 * this sprint's brief, without re-implementing parsing.
 */
export interface ProcessedResponse extends UnifiedResponse {
  toolCallsPlaceholder: true;
  reasoningPlaceholder: true;
}

export function processResponse(raw: unknown, providerId: ProviderId): ProcessedResponse {
  const unified = parseResponse(raw, providerId);

  return {
    ...unified,
    text: unified.text.trim(),
    toolCallsPlaceholder: true,
    reasoningPlaceholder: true,
  };
}
