"use client";

import { X } from "lucide-react";

import { cn } from "@/lib/utils";
import { getFileIcon } from "@/lib/file-icon";

import { useEditorStore } from "../../store/editor-store";
import { TabContextMenu } from "./TabContextMenu";
import { editorTabBase, editorTabActive, editorTabDirtyDot, editorTabCloseBase } from "./editor-tabs.styles";
import type { EditorTabRowProps } from "./editor-tabs.types";

/**
 * UzCode AI — EditorTab (single tab)
 * Middle-click close is a placeholder: `onAuxClick` checks
 * `event.button === 1` and calls the same close handler as the X
 * button, but there's no visual affordance beyond that — matches
 * "Middle Click Close (placeholder)".
 */
export function EditorTab({ tab, active }: EditorTabRowProps) {
  const setActiveTab = useEditorStore((s) => s.setActiveTab);
  const closeTab = useEditorStore((s) => s.closeTab);
  const Icon = getFileIcon(tab.label);

  return (
    <div
      role="tab"
      aria-selected={active}
      tabIndex={0}
      onClick={() => setActiveTab(tab.id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setActiveTab(tab.id);
        }
      }}
      onAuxClick={(e) => {
        if (e.button === 1) closeTab(tab.id);
      }}
      className={cn(editorTabBase, active && editorTabActive)}
    >
      <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      <span className="max-w-[10rem] truncate">{tab.label}</span>
      {tab.isDirty ? (
        <span className={editorTabDirtyDot} aria-label="Unsaved changes" title="Unsaved changes" />
      ) : null}
      <button
        type="button"
        aria-label={`Close ${tab.label}`}
        onClick={(e) => {
          e.stopPropagation();
          closeTab(tab.id);
        }}
        className={editorTabCloseBase}
      >
        <X className="h-3 w-3" />
      </button>
      <TabContextMenu label={tab.label} />
    </div>
  );
}
