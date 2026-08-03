import { EditorTab } from "./EditorTab";
import { editorTabsBase } from "./editor-tabs.styles";
import type { EditorTabsProps } from "./editor-tabs.types";

/**
 * UzCode AI — EditorTabs
 * Horizontally scrollable strip (`overflow-x-auto`) — no wrapping,
 * no truncated tab list; matches "Horizontal Scroll" requirement.
 */
export function EditorTabs({ tabs, activeTabId }: EditorTabsProps) {
  if (tabs.length === 0) return null;

  return (
    <div role="tablist" aria-label="Open editors" className={editorTabsBase}>
      {tabs.map((tab) => (
        <EditorTab key={tab.id} tab={tab} active={tab.id === activeTabId} />
      ))}
    </div>
  );
}
