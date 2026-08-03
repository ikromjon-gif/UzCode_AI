import type { ProviderId } from "../../providers/provider.types";

export type ProviderHealthStatus = "unknown" | "healthy" | "degraded" | "unavailable";

export interface ProviderHealth {
  providerId: ProviderId;
  status: ProviderHealthStatus;
  checkedAt: string;
}
