"use client";

import { create } from "zustand";

import type { ProviderId } from "../providers/provider.types";
import type { AiContextSnapshot } from "../context/context.types";
import type { MemoryEntry, MemoryScope } from "../memory/memory.types";
import type { AiConfiguration } from "../config/ai-config.types";
import { defaultAiConfig } from "../config/default-config";
import { addMemory, getMemoryByScope, clearScope } from "../memory/memory-engine";

/**
 * UzCode AI — AI Store
 * Pure UI/engine state, no persist middleware, no backend. This is
 * the in-memory home for the Memory Engine's array (memory-engine.ts
 * itself holds no state — see that file's header comment) and the
 * live AiConfiguration a future Settings UI would edit.
 */
interface AiState {
  currentProviderId: ProviderId;
  currentModelId: string;
  selectedToolIds: string[];
  conversationContext: AiContextSnapshot | null;
  memory: MemoryEntry[];
  configuration: AiConfiguration;

  setProvider: (id: ProviderId) => void;
  setModel: (id: string) => void;
  toggleTool: (id: string) => void;
  setConversationContext: (snapshot: AiContextSnapshot) => void;
  remember: (entry: Omit<MemoryEntry, "id" | "createdAt">) => void;
  recallByScope: (scope: MemoryScope) => MemoryEntry[];
  forgetScope: (scope: MemoryScope) => void;
  updateConfiguration: (partial: Partial<AiConfiguration>) => void;
}

export const useAiStore = create<AiState>((set, get) => ({
  currentProviderId: defaultAiConfig.providerId,
  currentModelId: defaultAiConfig.modelId,
  selectedToolIds: [],
  conversationContext: null,
  memory: [],
  configuration: defaultAiConfig,

  setProvider: (id) => set({ currentProviderId: id }),
  setModel: (id) => set({ currentModelId: id }),

  toggleTool: (id) =>
    set((state) => ({
      selectedToolIds: state.selectedToolIds.includes(id)
        ? state.selectedToolIds.filter((t) => t !== id)
        : [...state.selectedToolIds, id],
    })),

  setConversationContext: (snapshot) => set({ conversationContext: snapshot }),

  remember: (entry) => set((state) => ({ memory: addMemory(state.memory, entry) })),
  recallByScope: (scope) => getMemoryByScope(get().memory, scope),
  forgetScope: (scope) => set((state) => ({ memory: clearScope(state.memory, scope) })),

  updateConfiguration: (partial) =>
    set((state) => ({ configuration: { ...state.configuration, ...partial } })),
}));
