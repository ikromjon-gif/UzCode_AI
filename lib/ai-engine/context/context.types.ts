/**
 * UzCode AI — Context Engine types
 * Shapes describing what could be included as context. Nothing here
 * reads a real filesystem, git repo, or terminal — every field is
 * populated by whatever the caller passes in.
 */
export interface OpenTabContext {
  path: string;
  language: string;
  isDirty: boolean;
}

export interface SelectionContext {
  filePath: string;
  text: string;
}

export interface CursorPositionContext {
  filePath: string;
  line: number;
  column: number;
}

export interface DiagnosticContext {
  filePath: string;
  severity: "error" | "warning" | "info";
  message: string;
}

/** Populated by a future Git Integration sprint — empty shape for now. */
export interface GitStatusContextPlaceholder {
  branch: string | null;
  changedFiles: number;
}

/** Populated by a future Terminal command-execution sprint. */
export interface TerminalContextPlaceholder {
  lastCommand: string | null;
}

/** Populated once Live Preview actually renders something. */
export interface PreviewContextPlaceholder {
  url: string | null;
}

export interface AiContextSnapshot {
  workspaceFiles: string[];
  openTabs: OpenTabContext[];
  selection: SelectionContext | null;
  cursorPosition: CursorPositionContext | null;
  diagnostics: DiagnosticContext[];
  gitStatus: GitStatusContextPlaceholder;
  terminal: TerminalContextPlaceholder;
  preview: PreviewContextPlaceholder;
}
