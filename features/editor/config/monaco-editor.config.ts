import type { EditorSettings } from "../store/editor-store";

/**
 * UzCode AI — Production Monaco options.
 * `getMonacoOptions` merges the fixed, always-on production baseline
 * below with the user-adjustable subset from editor-store's
 * `settings` slice, so there's exactly one place that assembles the
 * final options object.
 *
 * codeLens and inlineSuggest are enabled at the API level only
 * ("foundation") — no lens provider or completion provider is
 * registered anywhere, so neither actually produces output yet. That
 * wiring is AI/code-intelligence work, explicitly out of scope.
 */
export function getMonacoOptions(settings: EditorSettings) {
  return {
    // Fixed production baseline
    automaticLayout: true,
    folding: true,
    bracketPairColorization: { enabled: true },
    autoClosingBrackets: "always" as const,
    autoClosingQuotes: "always" as const,
    formatOnPaste: true,
    formatOnType: true,
    stickyScroll: { enabled: true },
    smoothScrolling: true,
    cursorSmoothCaretAnimation: "on" as const,
    cursorBlinking: "smooth" as const,
    multiCursorModifier: "alt" as const,
    codeLens: true,
    inlineSuggest: { enabled: true },
    padding: { top: 12 },
    scrollBeyondLastLine: false,

    // User-adjustable (Editor Settings, Sprint 6 architecture)
    fontSize: settings.fontSize,
    fontFamily: settings.fontFamily,
    tabSize: settings.tabSize,
    wordWrap: settings.wordWrap ? ("on" as const) : ("off" as const),
    minimap: { enabled: settings.minimap },
    lineNumbers: settings.lineNumbers ? ("on" as const) : ("off" as const),
  };
}
