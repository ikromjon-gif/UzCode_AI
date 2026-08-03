import type * as React from "react";

import type { TreeNode } from "../../types/file-tree.types";

export interface TreeProps {
  nodes: TreeNode[];
  "aria-label": string;
}

export interface TreeItemRowProps {
  depth: number;
  icon: React.ReactNode;
  label: string;
  selected: boolean;
  actions?: React.ReactNode;
  expandable?: boolean;
  expanded?: boolean;
  onSelect: () => void;
  onToggle?: () => void;
}

export interface TreeFolderProps {
  node: TreeNode;
  depth: number;
}

export interface TreeFileProps {
  node: TreeNode;
  depth: number;
}
