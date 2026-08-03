export interface MetricsSnapshot {
  requestCount: number;
  estimatedTokens: number;
  estimatedCostUsd: number;
  providerUsage: Record<string, number>;
  errorCount: number;
  successCount: number;
  successRate: number;
  /** Always null this sprint — no real request ever completes to time. */
  latencyMsPlaceholder: number | null;
}
