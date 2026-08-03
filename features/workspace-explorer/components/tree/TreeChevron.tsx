"use client";

import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { treeChevronBase } from "./tree.styles";

/**
 * UzCode AI — TreeChevron
 * Stops click propagation so toggling expand/collapse doesn't also
 * re-fire the parent row's onSelect — see TreeItem for the row-level
 * click behavior this deliberately opts out of.
 */
export function TreeChevron({
  expanded,
  onToggle,
}: {
  expanded?: boolean;
  onToggle?: () => void;
}) {
  if (!onToggle) return <span className={treeChevronBase} aria-hidden="true" />;

  return (
    <button
      type="button"
      tabIndex={-1}
      aria-hidden="true"
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      className={cn(treeChevronBase, expanded && "rotate-90")}
    >
      <ChevronRight className="h-3.5 w-3.5" />
    </button>
  );
}
