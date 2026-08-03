import type { ProviderId } from "../../providers/provider.types";
import type { AiContextSnapshot } from "../../context/context.types";
import type { MemoryEntry } from "../../memory/memory.types";
import type { RuntimeRequest } from "../lifecycle/request-lifecycle.types";
import type { ProcessedResponse } from "../response-pipeline/response-pipeline";
import type { TokenEstimate } from "../token-estimator/token-estimator.types";
import type { ProviderSelectionResult } from "../provider-selection/provider-selection";

export interface RuntimeRunInput {
  userPrompt: string;
  preferredProviderId: ProviderId;
  preferredModelId: string;
  workspaceSnapshot: AiContextSnapshot;
  conversationHistory: string[];
  memory: MemoryEntry[];
  pinnedContext: string[];
  filesContext?: string[];
}

export interface RuntimeRunResult {
  request: RuntimeRequest;
  providerSelection: ProviderSelectionResult | null;
  tokenEstimate: TokenEstimate | null;
  response: ProcessedResponse | null;
  errors: string[];
}
