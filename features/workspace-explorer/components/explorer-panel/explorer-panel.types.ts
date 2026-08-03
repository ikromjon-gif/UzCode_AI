import type { TreeNode } from "../../types/file-tree.types";

export interface ExplorerPanelProps {
  nodes: TreeNode[];
  isLoading?: boolean;
}
