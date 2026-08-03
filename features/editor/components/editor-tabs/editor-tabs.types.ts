import type { EditorTab } from "@/types/editor";

export interface EditorTabsProps {
  tabs: EditorTab[];
  activeTabId: string | null;
}

export interface EditorTabRowProps {
  tab: EditorTab;
  active: boolean;
}
