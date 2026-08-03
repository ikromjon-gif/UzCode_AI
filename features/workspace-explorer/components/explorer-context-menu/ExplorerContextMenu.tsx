"use client";

import { FilePlus, FolderPlus, Pencil, Trash2, Copy, FileSymlink, Compass } from "lucide-react";

import { ContextMenuTrigger } from "@/components/ui/context-menu-trigger";
import { DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

/**
 * UzCode AI — ExplorerContextMenu
 * UI structure only — every item is inert (no onClick handler wired).
 * Trigger shell is shared (components/ui/context-menu-trigger); only
 * these menu items are feature-specific.
 */
export function ExplorerContextMenu({ label }: { label: string }) {
  return (
    <ContextMenuTrigger label={label}>
      <DropdownMenuItem><FilePlus className="h-4 w-4" aria-hidden="true" /> New File</DropdownMenuItem>
      <DropdownMenuItem><FolderPlus className="h-4 w-4" aria-hidden="true" /> New Folder</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem><Pencil className="h-4 w-4" aria-hidden="true" /> Rename</DropdownMenuItem>
      <DropdownMenuItem><Copy className="h-4 w-4" aria-hidden="true" /> Duplicate</DropdownMenuItem>
      <DropdownMenuItem><FileSymlink className="h-4 w-4" aria-hidden="true" /> Copy Path</DropdownMenuItem>
      <DropdownMenuItem><Compass className="h-4 w-4" aria-hidden="true" /> Reveal</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem destructive><Trash2 className="h-4 w-4" aria-hidden="true" /> Delete</DropdownMenuItem>
    </ContextMenuTrigger>
  );
}
