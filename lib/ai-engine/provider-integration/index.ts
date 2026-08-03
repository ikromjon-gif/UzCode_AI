/**
 * UzCode AI — Provider Integration barrel (Sprint 10).
 */
export * from "./adapters";
export { buildUnifiedRequest, buildProviderRequest } from "./request/request-builder";
export type { UnifiedRequest, UnifiedMessage, ModelSettings, RequestBuilderInput, ProviderRequest } from "./request/request.types";

export { parseResponse } from "./response/response-parser";
export type {
  UnifiedResponse,
  ToolCallResult,
  UsageMetadata,
  FinishReason,
  RawAnthropicResponse,
  RawOpenAiCompatibleResponse,
  RawGeminiResponse,
  RawOllamaResponse,
  RawCustomResponse,
} from "./response/response.types";

export {
  AiError,
  createAuthenticationError,
  createRateLimitError,
  createTimeoutError,
  createValidationError,
  createProviderError,
  createNetworkPlaceholderError,
  createInternalError,
} from "./errors/ai-error";
export type { AiErrorType } from "./errors/ai-error.types";

export { defaultRetryPolicy, shouldRetry, getBackoffDelayMs } from "./retry/retry-strategy";
export type { RetryPolicy } from "./retry/retry-strategy";

export { rateLimitRegistry, getRateLimit } from "./rate-limit/rate-limit-registry";
export type { RateLimitMetadata } from "./rate-limit/rate-limit.types";

export { createProvider, registerProvider, resolveProvider, validateProvider } from "./factory/provider-factory";

export { ProviderManager } from "./manager/provider-manager";
export type { ProviderHealth, ProviderHealthStatus } from "./manager/provider-manager.types";
