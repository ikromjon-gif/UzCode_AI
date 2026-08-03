"use client";

import type * as React from "react";

import { useEditorStore } from "../../store/editor-store";
import { getLanguageLabel } from "../../config/supported-languages";

/**
 * UzCode AI — EditorFooter
 * Cursor position and tab size reflect real store state (already
 * tracked via MonacoEditor's onDidChangeCursorPosition and the
 * settings slice) — not business logic, just displaying UI state
 * that already exists. Encoding stays a fixed display value.
 */
export function EditorFooter({
  language,
  trailingSlot,
}: {
  language: string;
  trailingSlot?: React.ReactNode;
}) {
  const cursorPosition = useEditorStore((s) => s.cursorPosition);
  const tabSize = useEditorStore((s) => s.settings.tabSize);

  return (
    <div className="flex h-6 shrink-0 items-center gap-4 border-t border-border px-3 text-xs text-muted-foreground">
      <span>
        Ln {cursorPosition.line}, Col {cursorPosition.column}
      </span>
      <span>Spaces: {tabSize}</span>
      <div className="flex-1" />
      <span>{getLanguageLabel(language)}</span>
      <span>UTF-8</span>
      {trailingSlot}
    </div>
  );
}
