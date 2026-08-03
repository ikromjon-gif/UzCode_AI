"use client";

import { MoreHorizontal } from "lucide-react";

import { cn } from "@/lib/utils";
import { IconButton } from "@/components/ui/icon-button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu";

import type { ContextMenuTriggerProps } from "./context-menu-trigger.types";

/**
 * UzCode AI — ContextMenuTrigger
 * Shared kebab-button + DropdownMenu wiring, extracted from three
 * near-identical copies (ExplorerContextMenu, TabContextMenu,
 * ConversationContextMenu — Sprints 5/6/7). Each feature keeps its
 * own menu *items* (still feature-local); only the generic trigger
 * shell moves here. No variant prop exists, so this intentionally
 * skips the 5-file convention's variants.ts/styles.ts — nothing to
 * put in them.
 */
export function ContextMenuTrigger({ label, children, triggerClassName }: ContextMenuTriggerProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <IconButton
          aria-label={`More actions for ${label}`}
          variant="ghost"
          size="sm"
          icon={<MoreHorizontal className="h-3.5 w-3.5" />}
          className={cn("h-5 w-5", triggerClassName)}
          onClick={(e) => e.stopPropagation()}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">{children}</DropdownMenuContent>
    </DropdownMenu>
  );
}
