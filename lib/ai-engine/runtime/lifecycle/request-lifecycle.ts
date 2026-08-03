import type { RuntimeRequest, RequestStage } from "./request-lifecycle.types";

/**
 * UzCode AI — Request Lifecycle
 * Pure state tracking — no networking, no side effects beyond
 * returning a new RuntimeRequest snapshot. The Orchestrator advances
 * a request through these stages in order; nothing here decides
 * WHEN to advance, only records that it happened.
 */
export function createRuntimeRequest(id: string): RuntimeRequest {
  const now = new Date().toISOString();
  return { id, stage: "created", stageHistory: ["created"], createdAt: now, updatedAt: now, error: null };
}

export function transitionStage(request: RuntimeRequest, nextStage: RequestStage): RuntimeRequest {
  return {
    ...request,
    stage: nextStage,
    stageHistory: [...request.stageHistory, nextStage],
    updatedAt: new Date().toISOString(),
  };
}

export function failRequest(request: RuntimeRequest, error: string): RuntimeRequest {
  return { ...transitionStage(request, "failed"), error };
}

export function cancelRequest(request: RuntimeRequest): RuntimeRequest {
  return transitionStage(request, "cancelled");
}
