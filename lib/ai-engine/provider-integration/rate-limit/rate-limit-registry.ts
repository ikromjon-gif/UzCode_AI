import type { ProviderId } from "../../providers/provider.types";
import type { RateLimitMetadata } from "./rate-limit.types";

/**
 * UzCode AI — Rate Limit Registry
 * Static, illustrative metadata only. No counter, timer, or queue
 * exists anywhere in this sprint to actually enforce these numbers —
 * that's runtime logic explicitly out of scope.
 */
export const rateLimitRegistry: Record<ProviderId, RateLimitMetadata> = {
  anthropic: { requestsPerMinute: 50, tokensPerMinute: 100_000, maxConcurrency: 5, dailyRequestLimit: 10_000 },
  openai: { requestsPerMinute: 60, tokensPerMinute: 150_000, maxConcurrency: 5, dailyRequestLimit: 10_000 },
  gemini: { requestsPerMinute: 60, tokensPerMinute: 120_000, maxConcurrency: 5, dailyRequestLimit: 10_000 },
  deepseek: { requestsPerMinute: 60, tokensPerMinute: 100_000, maxConcurrency: 5, dailyRequestLimit: 10_000 },
  openrouter: { requestsPerMinute: 40, tokensPerMinute: 80_000, maxConcurrency: 3, dailyRequestLimit: 5_000 },
  ollama: { requestsPerMinute: 1000, tokensPerMinute: 1_000_000, maxConcurrency: 1, dailyRequestLimit: 1_000_000 },
  "azure-openai": { requestsPerMinute: 60, tokensPerMinute: 150_000, maxConcurrency: 5, dailyRequestLimit: 10_000 },
  custom: { requestsPerMinute: 60, tokensPerMinute: 100_000, maxConcurrency: 5, dailyRequestLimit: 10_000 },
};

export function getRateLimit(providerId: ProviderId): RateLimitMetadata {
  return rateLimitRegistry[providerId];
}
