import type {
  AiContextSnapshot,
  OpenTabContext,
  SelectionContext,
  CursorPositionContext,
  DiagnosticContext,
} from "./context.types";

/**
 * UzCode AI — Context Engine
 * `collectContext` is a pure assembler — it merges whatever the
 * caller passes in (e.g. a future sprint reading editor-store's real
 * open tabs) into one snapshot shape. It never reads a filesystem,
 * queries git, or inspects a real terminal itself.
 */
export interface CollectContextInput {
  workspaceFiles?: string[];
  openTabs?: OpenTabContext[];
  selection?: SelectionContext | null;
  cursorPosition?: CursorPositionContext | null;
  diagnostics?: DiagnosticContext[];
}

export function collectContext(input: CollectContextInput): AiContextSnapshot {
  return {
    workspaceFiles: input.workspaceFiles ?? [],
    openTabs: input.openTabs ?? [],
    selection: input.selection ?? null,
    cursorPosition: input.cursorPosition ?? null,
    diagnostics: input.diagnostics ?? [],
    gitStatus: { branch: null, changedFiles: 0 },
    terminal: { lastCommand: null },
    preview: { url: null },
  };
}

/** Rough summary string a future PromptBuilder could pass as workspaceContext. */
export function summarizeContext(snapshot: AiContextSnapshot): string {
  const parts: string[] = [];
  if (snapshot.openTabs.length) parts.push(`${snapshot.openTabs.length} open tab(s)`);
  if (snapshot.diagnostics.length) parts.push(`${snapshot.diagnostics.length} diagnostic(s)`);
  if (snapshot.selection) parts.push("active selection present");
  return parts.join(", ") || "No workspace context available.";
}
