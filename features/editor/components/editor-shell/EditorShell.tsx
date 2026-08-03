"use client";

import { EditorPlaceholder } from "../editor-placeholder";

import { EditorTabs } from "../editor-tabs";
import { EditorHeader } from "../editor-header";
import { EditorFooter } from "../editor-footer";
import { EditorSettingsPanel } from "../editor-settings";
import { MonacoEditor } from "../monaco-editor";
import { useEditorStore } from "../../store/editor-store";
import { sampleTabContent } from "../../constants/sample-tabs";

/**
 * UzCode AI — EditorShell
 * Composes Header + Tabs + MonacoEditor + Footer for the active tab.
 * Falls back to Sprint 5's EditorPlaceholder when there are zero open
 * tabs — this is the component that now fills WorkspaceExplorerShell's
 * `center` slot.
 */
export function EditorShell() {
  const openTabs = useEditorStore((s) => s.openTabs);
  const activeTabId = useEditorStore((s) => s.activeTabId);
  const activeTab = openTabs.find((t) => t.id === activeTabId);

  if (!activeTab) {
    return <EditorPlaceholder />;
  }

  return (
    <div className="flex h-full flex-col">
      <EditorTabs tabs={openTabs} activeTabId={activeTabId} />
      <EditorHeader filePath={activeTab.path} language={activeTab.language} />
      <div className="min-h-0 flex-1">
        <MonacoEditor
          key={activeTab.id}
          tabId={activeTab.id}
          path={activeTab.path}
          language={activeTab.language}
          value={sampleTabContent[activeTab.id] ?? ""}
        />
      </div>
      <EditorFooter language={activeTab.language} trailingSlot={<EditorSettingsPanel />} />
    </div>
  );
}
