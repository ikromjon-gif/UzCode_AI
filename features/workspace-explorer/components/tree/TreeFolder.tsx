"use client";

import { useWorkspaceStore } from "../../store/workspace-store";
import { ExplorerContextMenu } from "../explorer-context-menu";
import { TreeItem } from "./TreeItem";
import { TreeIcon } from "./TreeIcon";
import { TreeActions } from "./TreeActions";
import { TreeFile } from "./TreeFile";
import type { TreeFolderProps } from "./tree.types";

/**
 * UzCode AI — TreeFolder
 * Recursive: renders its own row via TreeItem, and — only while
 * expanded — its children (further TreeFolder/TreeFile). Expansion
 * and selection both read/write the Zustand workspace-store.
 */
export function TreeFolder({ node, depth }: TreeFolderProps) {
  const expanded = useWorkspaceStore((s) => s.expandedFolderIds.has(node.id));
  const selected = useWorkspaceStore((s) => s.selectedNodeId === node.id);
  const toggleFolder = useWorkspaceStore((s) => s.toggleFolder);
  const selectNode = useWorkspaceStore((s) => s.selectNode);

  return (
    <TreeItem
      depth={depth}
      label={node.name}
      selected={selected}
      expandable
      expanded={expanded}
      onSelect={() => selectNode(node.id)}
      onToggle={() => toggleFolder(node.id)}
      icon={<TreeIcon type="folder" name={node.name} expanded={expanded} />}
      actions={
        <TreeActions>
          <ExplorerContextMenu label={node.name} />
        </TreeActions>
      }
    >
      {expanded && node.children ? (
        <div role="group">
          {node.children.length === 0 ? (
            <div style={{ paddingLeft: (depth + 2) * 14 }} className="py-1 text-xs text-muted-foreground">
              Empty folder
            </div>
          ) : (
            node.children.map((child) =>
              child.type === "folder" ? (
                <TreeFolder key={child.id} node={child} depth={depth + 1} />
              ) : (
                <TreeFile key={child.id} node={child} depth={depth + 1} />
              ),
            )
          )}
        </div>
      ) : null}
    </TreeItem>
  );
}
