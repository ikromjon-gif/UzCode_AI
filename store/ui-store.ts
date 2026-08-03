"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * UzCode AI — UI Store
 * Cross-component layout/UI state only: no API calls, no domain
 * rules. Persisted to localStorage so collapse preferences survive
 * a reload — this is presentation-layer persistence, not business logic.
 */
interface UiState {
  sidebarCollapsed: boolean;
  leftPanelCollapsed: boolean;
  rightPanelCollapsed: boolean;
  commandPaletteOpen: boolean;
  toggleSidebar: () => void;
  toggleLeftPanel: () => void;
  toggleRightPanel: () => void;
  setCommandPaletteOpen: (open: boolean) => void;
}

export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      sidebarCollapsed: false,
      leftPanelCollapsed: false,
      rightPanelCollapsed: false,
      commandPaletteOpen: false,
      toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
      toggleLeftPanel: () => set((s) => ({ leftPanelCollapsed: !s.leftPanelCollapsed })),
      toggleRightPanel: () => set((s) => ({ rightPanelCollapsed: !s.rightPanelCollapsed })),
      setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),
    }),
    { name: "uzcode-ai-ui-store" },
  ),
);
