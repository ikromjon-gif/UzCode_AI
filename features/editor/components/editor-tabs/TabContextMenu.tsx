"use client";

import { X, XCircle, FileSymlink, Compass } from "lucide-react";

import { ContextMenuTrigger } from "@/components/ui/context-menu-trigger";
import { DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

/**
 * UzCode AI — TabContextMenu
 * UI structure only — every item is inert. Trigger shell is shared
 * (components/ui/context-menu-trigger); hover-reveal sizing is passed
 * via triggerClassName to match the tab strip's compact rows.
 */
export function TabContextMenu({ label }: { label: string }) {
  return (
    <ContextMenuTrigger
      label={label}
      triggerClassName="h-4 w-4 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"
    >
      <DropdownMenuItem><X className="h-4 w-4" aria-hidden="true" /> Close</DropdownMenuItem>
      <DropdownMenuItem><XCircle className="h-4 w-4" aria-hidden="true" /> Close Others</DropdownMenuItem>
      <DropdownMenuItem><XCircle className="h-4 w-4" aria-hidden="true" /> Close All</DropdownMenuItem>
      <DropdownMenuItem><XCircle className="h-4 w-4" aria-hidden="true" /> Close to the Right</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem><FileSymlink className="h-4 w-4" aria-hidden="true" /> Copy Path</DropdownMenuItem>
      <DropdownMenuItem><Compass className="h-4 w-4" aria-hidden="true" /> Reveal in Explorer</DropdownMenuItem>
    </ContextMenuTrigger>
  );
}
