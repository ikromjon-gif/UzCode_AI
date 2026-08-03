"use client";

import { create } from "zustand";

/**
 * UzCode AI — Workspace Store
 * Pure UI state: tree expansion/selection, active right-panel module,
 * bottom-panel visibility/active tab. Deliberately NOT wrapped in
 * zustand's `persist` middleware — this sprint's state resets on
 * reload by design (no backend, no persistence yet).
 *
 * Left/right panel SHOW/HIDE reuses Sprint 4's `useUiStore`
 * (leftPanelCollapsed/rightPanelCollapsed) rather than duplicating
 * that boolean here — WorkspaceLayout already owns it. This store
 * only adds state Sprint 4 has no slot for: which right-panel module
 * is active, and the bottom panel (new this sprint).
 */
interface WorkspaceState {
  expandedFolderIds: Set<string>;
  selectedNodeId: string | null;
  activeRightModuleId: string;
  bottomPanelVisible: boolean;
  activeBottomTabId: string;

  toggleFolder: (id: string) => void;
  selectNode: (id: string) => void;
  setActiveRightModule: (id: string) => void;
  toggleBottomPanel: () => void;
  setActiveBottomTab: (id: string) => void;
}

export const useWorkspaceStore = create<WorkspaceState>((set) => ({
  expandedFolderIds: new Set(),
  selectedNodeId: null,
  activeRightModuleId: "ai-assistant",
  bottomPanelVisible: true,
  activeBottomTabId: "terminal",

  toggleFolder: (id) =>
    set((state) => {
      const next = new Set(state.expandedFolderIds);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return { expandedFolderIds: next };
    }),

  selectNode: (id) => set({ selectedNodeId: id }),
  setActiveRightModule: (id) => set({ activeRightModuleId: id }),
  toggleBottomPanel: () => set((s) => ({ bottomPanelVisible: !s.bottomPanelVisible })),
  setActiveBottomTab: (id) => set({ activeBottomTabId: id, bottomPanelVisible: true }),
}));
