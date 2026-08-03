"use client";

import { useWorkspaceStore } from "../../store/workspace-store";
import { ExplorerContextMenu } from "../explorer-context-menu";
import { TreeItem } from "./TreeItem";
import { TreeIcon } from "./TreeIcon";
import { TreeActions } from "./TreeActions";
import type { TreeFileProps } from "./tree.types";

/** UzCode AI — TreeFile. Leaf row — selection only, no expand/collapse. */
export function TreeFile({ node, depth }: TreeFileProps) {
  const selected = useWorkspaceStore((s) => s.selectedNodeId === node.id);
  const selectNode = useWorkspaceStore((s) => s.selectNode);

  return (
    <TreeItem
      depth={depth}
      label={node.name}
      selected={selected}
      onSelect={() => selectNode(node.id)}
      icon={<TreeIcon type="file" name={node.name} />}
      actions={
        <TreeActions>
          <ExplorerContextMenu label={node.name} />
        </TreeActions>
      }
    />
  );
}
