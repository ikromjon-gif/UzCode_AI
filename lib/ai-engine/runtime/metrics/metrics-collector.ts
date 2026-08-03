import type { MetricsSnapshot } from "./metrics.types";

/**
 * UzCode AI — Metrics Collector
 * In-memory counters only, no persistence — resets whenever the
 * instance is recreated (the Runtime Store, not this class, decides
 * how long an instance lives).
 */
export class MetricsCollector {
  private requestCount = 0;
  private estimatedTokens = 0;
  private estimatedCostUsd = 0;
  private providerUsage: Record<string, number> = {};
  private errorCount = 0;
  private successCount = 0;

  recordRequest(providerId: string, tokens: number, costUsd: number): void {
    this.requestCount += 1;
    this.estimatedTokens += tokens;
    this.estimatedCostUsd += costUsd;
    this.providerUsage[providerId] = (this.providerUsage[providerId] ?? 0) + 1;
  }

  recordSuccess(): void {
    this.successCount += 1;
  }

  recordError(): void {
    this.errorCount += 1;
  }

  getSnapshot(): MetricsSnapshot {
    const total = this.successCount + this.errorCount;
    return {
      requestCount: this.requestCount,
      estimatedTokens: this.estimatedTokens,
      estimatedCostUsd: this.estimatedCostUsd,
      providerUsage: { ...this.providerUsage },
      errorCount: this.errorCount,
      successCount: this.successCount,
      successRate: total === 0 ? 1 : this.successCount / total,
      latencyMsPlaceholder: null,
    };
  }

  reset(): void {
    this.requestCount = 0;
    this.estimatedTokens = 0;
    this.estimatedCostUsd = 0;
    this.providerUsage = {};
    this.errorCount = 0;
    this.successCount = 0;
  }
}
