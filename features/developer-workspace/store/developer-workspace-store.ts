"use client";

import { create } from "zustand";

import type { TerminalTab } from "../types/terminal.types";
import type { PreviewDevice, SplitDirection } from "../types/preview.types";

/**
 * UzCode AI — Developer Workspace Store
 * Pure UI state, no persist, no backend. Terminal tabs are UI shells
 * only — creating one does not spawn a process (no command execution
 * this sprint).
 */
const initialTerminals: TerminalTab[] = [{ id: "terminal-1", label: "bash" }];

interface DeveloperWorkspaceState {
  terminals: TerminalTab[];
  activeTerminalId: string;
  activeBottomTabId: string;
  previewVisible: boolean;
  activePreviewDevice: PreviewDevice;
  splitDirection: SplitDirection;

  createTerminal: () => void;
  closeTerminal: (id: string) => void;
  renameTerminal: (id: string, label: string) => void;
  setActiveTerminal: (id: string) => void;
  setActiveBottomTab: (id: string) => void;
  togglePreview: () => void;
  setPreviewDevice: (device: PreviewDevice) => void;
  setSplitDirection: (direction: SplitDirection) => void;
}

export const useDeveloperWorkspaceStore = create<DeveloperWorkspaceState>((set, get) => ({
  terminals: initialTerminals,
  activeTerminalId: initialTerminals[0]!.id,
  activeBottomTabId: "terminal",
  previewVisible: false,
  activePreviewDevice: "desktop",
  splitDirection: "horizontal",

  createTerminal: () => {
    const { terminals } = get();
    const id = `terminal-${terminals.length + 1}-${Date.now()}`;
    const tab: TerminalTab = { id, label: `bash ${terminals.length + 1}` };
    set({ terminals: [...terminals, tab], activeTerminalId: id });
  },

  closeTerminal: (id) => {
    const { terminals, activeTerminalId } = get();
    if (terminals.length <= 1) return; // always keep at least one terminal tab
    const index = terminals.findIndex((t) => t.id === id);
    const next = terminals.filter((t) => t.id !== id);
    const nextActive = activeTerminalId === id ? (next[Math.max(0, index - 1)]?.id ?? next[0]!.id) : activeTerminalId;
    set({ terminals: next, activeTerminalId: nextActive });
  },

  renameTerminal: (id, label) =>
    set((state) => ({ terminals: state.terminals.map((t) => (t.id === id ? { ...t, label } : t)) })),

  setActiveTerminal: (id) => set({ activeTerminalId: id }),
  setActiveBottomTab: (id) => set({ activeBottomTabId: id }),
  togglePreview: () => set((s) => ({ previewVisible: !s.previewVisible })),
  setPreviewDevice: (device) => set({ activePreviewDevice: device }),
  setSplitDirection: (direction) => set({ splitDirection: direction }),
}));
