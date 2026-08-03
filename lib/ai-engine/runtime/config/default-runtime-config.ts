import { defaultRetryPolicy } from "../../provider-integration";
import type { RuntimeConfiguration } from "./runtime-config.types";

/** UzCode AI — Default runtime configuration. In-memory only — no persistence. */
export const defaultRuntimeConfig: RuntimeConfiguration = {
  timeoutMs: 30_000,
  retryPolicy: defaultRetryPolicy,
  fallbackEnabled: true,
  loggingEnabled: true,
  metricsEnabled: true,
  contextLimits: { maxOpenTabs: 20, maxSelectedFiles: 10, maxDiagnostics: 50 },
  promptLimits: { maxApproxLength: 200_000, maxConversationTurns: 50 },
};
