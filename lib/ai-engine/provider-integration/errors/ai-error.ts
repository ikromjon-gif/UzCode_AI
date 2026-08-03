import type { AiErrorType } from "./ai-error.types";
import type { ProviderId } from "../../providers/provider.types";

/**
 * UzCode AI — AiError
 * Unified error shape every adapter/pipeline stage throws instead of
 * a raw provider-specific error. `retryable` feeds the Retry
 * Strategy's shouldRetry() decision — nothing here retries anything
 * itself.
 */
export class AiError extends Error {
  readonly type: AiErrorType;
  readonly providerId?: ProviderId;
  readonly retryable: boolean;
  readonly statusCode?: number;

  constructor(type: AiErrorType, message: string, options?: { providerId?: ProviderId; retryable?: boolean; statusCode?: number }) {
    super(message);
    this.name = "AiError";
    this.type = type;
    this.providerId = options?.providerId;
    this.retryable = options?.retryable ?? false;
    this.statusCode = options?.statusCode;
  }
}

export function createAuthenticationError(providerId: ProviderId): AiError {
  return new AiError("authentication", `Authentication failed for ${providerId}.`, { providerId, retryable: false, statusCode: 401 });
}

export function createRateLimitError(providerId: ProviderId): AiError {
  return new AiError("rate-limit", `Rate limit exceeded for ${providerId}.`, { providerId, retryable: true, statusCode: 429 });
}

export function createTimeoutError(providerId: ProviderId): AiError {
  return new AiError("timeout", `Request to ${providerId} timed out.`, { providerId, retryable: true, statusCode: 408 });
}

export function createValidationError(message: string): AiError {
  return new AiError("validation", message, { retryable: false, statusCode: 400 });
}

export function createProviderError(providerId: ProviderId, message: string): AiError {
  return new AiError("provider", message, { providerId, retryable: true, statusCode: 500 });
}

/** Reserved for a future sprint's real network layer — never thrown this sprint. */
export function createNetworkPlaceholderError(providerId: ProviderId): AiError {
  return new AiError("network-placeholder", `Network error placeholder for ${providerId} — no real network call was made.`, { providerId, retryable: true });
}

export function createInternalError(message: string): AiError {
  return new AiError("internal", message, { retryable: false });
}
