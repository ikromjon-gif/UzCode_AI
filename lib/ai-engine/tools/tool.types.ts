/**
 * UzCode AI — Tool Registry types
 * Metadata contract only. `execute` is a documented function
 * signature every future tool implementation must satisfy — nothing
 * in this sprint calls it.
 */
export type ToolCategory =
  | "filesystem"
  | "editor"
  | "terminal"
  | "browser"
  | "git"
  | "deploy"
  | "search"
  | "web"
  | "diagnostics"
  | "preview";

export interface ToolDefinition {
  id: string;
  category: ToolCategory;
  label: string;
  description: string;
  requiresConfirmation: boolean;
}

/** Contract a future sprint implements — never invoked this sprint. */
export interface ToolExecutor {
  toolId: string;
  execute(input: unknown): Promise<unknown>;
}
