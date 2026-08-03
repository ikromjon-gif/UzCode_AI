import { Folder, FolderOpen } from "lucide-react";

import { cn } from "@/lib/utils";
import { getFileIcon } from "@/lib/file-icon";

import { treeIconBase, treeIconFolder } from "./tree.styles";

/** UzCode AI — TreeIcon. Folder open/closed state, or a file icon inferred from extension. */
export function TreeIcon({ type, name, expanded }: { type: "file" | "folder"; name: string; expanded?: boolean }) {
  if (type === "folder") {
    const Icon = expanded ? FolderOpen : Folder;
    return <Icon className={cn(treeIconBase, treeIconFolder)} aria-hidden="true" />;
  }
  const Icon = getFileIcon(name);
  return <Icon className={treeIconBase} aria-hidden="true" />;
}
