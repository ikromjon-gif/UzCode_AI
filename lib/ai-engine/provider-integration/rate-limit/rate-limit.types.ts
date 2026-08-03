export interface RateLimitMetadata {
  requestsPerMinute: number;
  tokensPerMinute: number;
  maxConcurrency: number;
  dailyRequestLimit: number;
}
