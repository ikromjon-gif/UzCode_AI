/**
 * UzCode AI — Workspace Explorer feature barrel.
 */
export { WorkspaceExplorerShell } from "./components/workspace-explorer-shell";
export { ExplorerPanel } from "./components/explorer-panel";
export { RightPanel } from "./components/right-panel";
export { BottomPanel } from "./components/bottom-panel";
export * from "./components/tree";
export { useWorkspaceStore } from "./store/workspace-store";
export { mockFileTree } from "./constants/mock-file-tree";
export type { TreeNode } from "./types/file-tree.types";
export type { PanelModule, EditorTab } from "./types/workspace.types";
