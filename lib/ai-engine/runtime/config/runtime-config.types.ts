import type { RetryPolicy } from "../../provider-integration";

export interface ContextLimits {
  maxOpenTabs: number;
  maxSelectedFiles: number;
  maxDiagnostics: number;
}

export interface PromptLimits {
  maxApproxLength: number;
  maxConversationTurns: number;
}

export interface RuntimeConfiguration {
  timeoutMs: number;
  retryPolicy: RetryPolicy;
  fallbackEnabled: boolean;
  loggingEnabled: boolean;
  metricsEnabled: boolean;
  contextLimits: ContextLimits;
  promptLimits: PromptLimits;
}
