"use client";

import { create } from "zustand";

import type { EditorTab } from "@/types/editor";

import { sampleTabs } from "../constants/sample-tabs";

/**
 * UzCode AI — Editor Store
 * Pure UI/editor state: open tabs, active tab, cursor position, dirty
 * flags, recent files, and adjustable settings. No `persist`
 * middleware (explicit this sprint — resets on reload), no backend,
 * no filesystem. "File Manager" from the sprint brief IS this slice,
 * not a separate component — open/close/active/dirty are the same
 * concepts as tabs.
 */
export interface EditorSettings {
  fontSize: number;
  fontFamily: string;
  tabSize: number;
  wordWrap: boolean;
  minimap: boolean;
  lineNumbers: boolean;
}

export interface CursorPosition {
  line: number;
  column: number;
}

const MAX_RECENT_FILES = 10;

interface EditorState {
  openTabs: EditorTab[];
  activeTabId: string | null;
  cursorPosition: CursorPosition;
  recentFiles: string[]; // file paths, most-recent-first
  settings: EditorSettings;

  openTab: (tab: EditorTab) => void;
  closeTab: (id: string) => void;
  setActiveTab: (id: string) => void;
  setTabDirty: (id: string, isDirty: boolean) => void;
  updateCursorPosition: (position: CursorPosition) => void;
  updateSettings: (partial: Partial<EditorSettings>) => void;
}

const defaultSettings: EditorSettings = {
  fontSize: 14,
  fontFamily: "var(--font-jetbrains-mono), monospace",
  tabSize: 2,
  wordWrap: true,
  minimap: true,
  lineNumbers: true,
};

export const useEditorStore = create<EditorState>((set, get) => ({
  // Seeded with sample demo tabs (see constants/sample-tabs.ts) so
  // Monaco's multi-language/multi-tab setup is visible without real
  // "open file from Explorer" wiring, which is out of scope this sprint.
  openTabs: sampleTabs,
  activeTabId: sampleTabs[0]?.id ?? null,
  cursorPosition: { line: 1, column: 1 },
  recentFiles: sampleTabs.map((t) => t.path),
  settings: defaultSettings,

  openTab: (tab) => {
    const { openTabs, recentFiles } = get();
    const alreadyOpen = openTabs.some((t) => t.id === tab.id);
    set({
      openTabs: alreadyOpen ? openTabs : [...openTabs, tab],
      activeTabId: tab.id,
      recentFiles: [tab.path, ...recentFiles.filter((p) => p !== tab.path)].slice(0, MAX_RECENT_FILES),
    });
  },

  closeTab: (id) => {
    const { openTabs, activeTabId } = get();
    const index = openTabs.findIndex((t) => t.id === id);
    if (index === -1) return;

    const nextTabs = openTabs.filter((t) => t.id !== id);
    let nextActiveId = activeTabId;

    if (activeTabId === id) {
      // Activate the neighbor to the left, or the new first tab, or none.
      const neighbor = nextTabs[Math.max(0, index - 1)];
      nextActiveId = neighbor?.id ?? null;
    }

    set({ openTabs: nextTabs, activeTabId: nextActiveId });
  },

  setActiveTab: (id) => set({ activeTabId: id }),

  setTabDirty: (id, isDirty) =>
    set((state) => ({
      openTabs: state.openTabs.map((t) => (t.id === id ? { ...t, isDirty } : t)),
    })),

  updateCursorPosition: (position) => set({ cursorPosition: position }),

  updateSettings: (partial) => set((state) => ({ settings: { ...state.settings, ...partial } })),
}));
