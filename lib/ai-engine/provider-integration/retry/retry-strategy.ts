import type { AiError } from "../errors/ai-error";
import type { AiErrorType } from "../errors/ai-error.types";

/**
 * UzCode AI — Retry Strategy
 * Policy + a pure decision function only. Nothing here sleeps,
 * loops, or re-sends a request — a future sprint's real request
 * pipeline would call shouldRetry() between attempts.
 */
export interface RetryPolicy {
  maxAttempts: number;
  baseDelayMs: number;
  backoffMultiplier: number;
  retryableErrorTypes: AiErrorType[];
}

export const defaultRetryPolicy: RetryPolicy = {
  maxAttempts: 3,
  baseDelayMs: 500,
  backoffMultiplier: 2,
  retryableErrorTypes: ["rate-limit", "timeout", "provider", "network-placeholder"],
};

/** Pure decision — does NOT wait or retry, just answers "should a caller retry?". */
export function shouldRetry(error: AiError, attempt: number, policy: RetryPolicy = defaultRetryPolicy): boolean {
  if (attempt >= policy.maxAttempts) return false;
  if (!error.retryable) return false;
  return policy.retryableErrorTypes.includes(error.type);
}

/** Pure calculation — does NOT actually delay execution. */
export function getBackoffDelayMs(attempt: number, policy: RetryPolicy = defaultRetryPolicy): number {
  return policy.baseDelayMs * Math.pow(policy.backoffMultiplier, attempt - 1);
}
