import type { LucideIcon } from "lucide-react";

export interface PanelModule {
  id: string;
  label: string;
  icon: LucideIcon;
}

// EditorTab moved to top-level types/editor.ts in Sprint 6 — both this
// feature's "Open Editors" nav section and the real Editor Tabs
// (features/editor) need the identical shape.
export type { EditorTab } from "@/types/editor";
