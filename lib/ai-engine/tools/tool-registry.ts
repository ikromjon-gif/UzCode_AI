import type { ToolDefinition } from "./tool.types";

/**
 * UzCode AI — Tool Registry
 * Static catalog of the 10 future tool categories. No tool here has
 * an executor wired up — see ToolExecutor in tool.types.ts for the
 * contract a future sprint fulfills per tool.
 */
export const toolRegistry: ToolDefinition[] = [
  { id: "tool-filesystem", category: "filesystem", label: "Filesystem", description: "Read/write/list workspace files.", requiresConfirmation: true },
  { id: "tool-editor", category: "editor", label: "Editor", description: "Apply edits to the active file.", requiresConfirmation: true },
  { id: "tool-terminal", category: "terminal", label: "Terminal", description: "Run a shell command.", requiresConfirmation: true },
  { id: "tool-browser", category: "browser", label: "Browser", description: "Interact with the live preview browser.", requiresConfirmation: false },
  { id: "tool-git", category: "git", label: "Git", description: "Inspect or modify git state.", requiresConfirmation: true },
  { id: "tool-deploy", category: "deploy", label: "Deploy", description: "Trigger a deployment.", requiresConfirmation: true },
  { id: "tool-search", category: "search", label: "Search", description: "Search the codebase.", requiresConfirmation: false },
  { id: "tool-web", category: "web", label: "Web", description: "Search or fetch the web.", requiresConfirmation: false },
  { id: "tool-diagnostics", category: "diagnostics", label: "Diagnostics", description: "Read compiler/lint diagnostics.", requiresConfirmation: false },
  { id: "tool-preview", category: "preview", label: "Preview", description: "Inspect the live preview state.", requiresConfirmation: false },
];

export function getToolsByCategory(category: string): ToolDefinition[] {
  return toolRegistry.filter((t) => t.category === category);
}

export function getTool(id: string): ToolDefinition | undefined {
  return toolRegistry.find((t) => t.id === id);
}
