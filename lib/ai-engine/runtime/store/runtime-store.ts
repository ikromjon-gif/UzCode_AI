"use client";

import { create } from "zustand";

import type { RuntimeRequest, RequestStage } from "../lifecycle/request-lifecycle.types";
import type { MetricsSnapshot } from "../metrics/metrics.types";
import type { RuntimeEvent } from "../event-bus/event-bus";
import type { RuntimeConfiguration } from "../config/runtime-config.types";
import { defaultRuntimeConfig } from "../config/default-runtime-config";

export type RuntimeStatus = "idle" | "running" | "completed" | "failed";

const MAX_EVENT_LOG = 50;

/**
 * UzCode AI — Runtime Store
 * Pure UI-facing state, no persist middleware, no backend. Mirrors
 * (doesn't replace) the Orchestrator's own run-time state — this is
 * what a future Runtime status UI would read from.
 */
interface RuntimeState {
  status: RuntimeStatus;
  currentRequest: RuntimeRequest | null;
  currentStage: RequestStage | null;
  metrics: MetricsSnapshot | null;
  events: RuntimeEvent[];
  configuration: RuntimeConfiguration;

  setStatus: (status: RuntimeStatus) => void;
  setCurrentRequest: (request: RuntimeRequest | null) => void;
  setMetrics: (snapshot: MetricsSnapshot) => void;
  pushEvent: (event: RuntimeEvent) => void;
  updateConfiguration: (partial: Partial<RuntimeConfiguration>) => void;
  reset: () => void;
}

export const useRuntimeStore = create<RuntimeState>((set) => ({
  status: "idle",
  currentRequest: null,
  currentStage: null,
  metrics: null,
  events: [],
  configuration: defaultRuntimeConfig,

  setStatus: (status) => set({ status }),
  setCurrentRequest: (request) => set({ currentRequest: request, currentStage: request?.stage ?? null }),
  setMetrics: (snapshot) => set({ metrics: snapshot }),
  pushEvent: (event) => set((state) => ({ events: [...state.events, event].slice(-MAX_EVENT_LOG) })),
  updateConfiguration: (partial) => set((state) => ({ configuration: { ...state.configuration, ...partial } })),
  reset: () => set({ status: "idle", currentRequest: null, currentStage: null, metrics: null, events: [] }),
}));
