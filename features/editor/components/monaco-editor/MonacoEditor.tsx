"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import type { OnMount, BeforeMount, OnChange } from "@monaco-editor/react";

import { Spinner } from "@/components/ui/spinner";

import { useEditorStore } from "../../store/editor-store";
import { getMonacoOptions } from "../../config/monaco-editor.config";
import { defineUzCodeThemes, UZCODE_LIGHT_THEME, UZCODE_DARK_THEME } from "../../config/monaco-theme";
import type { MonacoEditorProps } from "./monaco-editor.types";

/**
 * UzCode AI — MonacoEditor (isolated wrapper)
 * The ONLY file in the app that imports @monaco-editor/react. Lazy-
 * loaded via next/dynamic with ssr:false — Monaco requires browser
 * globals and cannot run during server rendering.
 */
const Editor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center">
      <Spinner size="lg" label="Loading editor" />
    </div>
  ),
});

export function MonacoEditor({ tabId, path, language, value, readOnly = false, onChange }: MonacoEditorProps) {
  const { resolvedTheme } = useTheme();
  const settings = useEditorStore((s) => s.settings);
  const updateCursorPosition = useEditorStore((s) => s.updateCursorPosition);
  const setTabDirty = useEditorStore((s) => s.setTabDirty);

  const monacoTheme = resolvedTheme === "dark" ? UZCODE_DARK_THEME : UZCODE_LIGHT_THEME;
  const options = React.useMemo(() => getMonacoOptions(settings), [settings]);

  const handleBeforeMount: BeforeMount = (monaco) => {
    defineUzCodeThemes(monaco);
  };

  const handleMount: OnMount = (editor) => {
    editor.onDidChangeCursorPosition((e) => {
      updateCursorPosition({ line: e.position.lineNumber, column: e.position.column });
    });
  };

  const handleChange: OnChange = (nextValue) => {
    setTabDirty(tabId, true);
    onChange?.(nextValue);
  };

  return (
    <Editor
      path={path}
      language={language}
      value={value}
      theme={monacoTheme}
      options={{ ...options, readOnly }}
      beforeMount={handleBeforeMount}
      onMount={handleMount}
      onChange={handleChange}
    />
  );
}
