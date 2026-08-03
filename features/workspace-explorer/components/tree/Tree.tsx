import { cn } from "@/lib/utils";

import { TreeFolder } from "./TreeFolder";
import { TreeFile } from "./TreeFile";
import { treeBase } from "./tree.styles";
import type { TreeProps } from "./tree.types";

/**
 * UzCode AI — Tree (root)
 * `role="tree"` container. Virtualization-ready: nothing here
 * assumes the full node list is small — swapping the `.map()` below
 * for a windowed renderer (e.g. react-window) later doesn't change
 * TreeItem/TreeFolder/TreeFile's contract at all.
 */
export function Tree({ nodes, className, ...props }: TreeProps & { className?: string }) {
  return (
    <div role="tree" className={cn(treeBase, className)} {...props}>
      {nodes.map((node) =>
        node.type === "folder" ? (
          <TreeFolder key={node.id} node={node} depth={0} />
        ) : (
          <TreeFile key={node.id} node={node} depth={0} />
        ),
      )}
    </div>
  );
}
