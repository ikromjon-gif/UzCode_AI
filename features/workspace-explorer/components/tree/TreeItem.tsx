"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

import { TreeIndent } from "./TreeIndent";
import { TreeChevron } from "./TreeChevron";
import { TreeLabel } from "./TreeLabel";
import { treeItemBase, treeItemSelected } from "./tree.styles";
import type { TreeItemRowProps } from "./tree.types";

/**
 * UzCode AI — TreeItem (shared row)
 * Composes Indent + Chevron + caller-supplied icon/label/actions into
 * one keyboard-navigable `role="treeitem"` row. Keyboard nav walks
 * `[role="treeitem"]` elements in DOM order — since collapsed
 * folders don't render their children, only currently-visible rows
 * exist in the DOM, so this naturally respects expand/collapse state
 * with no separate "visible nodes" list to keep in sync.
 */
export function TreeItem({
  depth,
  icon,
  label,
  selected,
  actions,
  expandable,
  expanded,
  onSelect,
  onToggle,
  children,
}: TreeItemRowProps & { children?: React.ReactNode }) {
  const ref = React.useRef<HTMLDivElement>(null);

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    const container = (e.currentTarget as HTMLElement).closest('[role="tree"]');
    if (!container) return;
    const items = Array.from(container.querySelectorAll<HTMLElement>('[role="treeitem"]'));
    const currentIndex = items.indexOf(e.currentTarget);

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        items[currentIndex + 1]?.focus();
        break;
      case "ArrowUp":
        e.preventDefault();
        items[currentIndex - 1]?.focus();
        break;
      case "ArrowRight":
        if (expandable && !expanded) {
          e.preventDefault();
          onToggle?.();
        }
        break;
      case "ArrowLeft":
        if (expandable && expanded) {
          e.preventDefault();
          onToggle?.();
        }
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        onSelect();
        if (expandable) onToggle?.();
        break;
    }
  }

  return (
    <div>
      <div
        ref={ref}
        role="treeitem"
        aria-selected={selected}
        aria-expanded={expandable ? expanded : undefined}
        tabIndex={0}
        data-selected={selected}
        onClick={() => {
          onSelect();
          if (expandable) onToggle?.();
        }}
        onKeyDown={handleKeyDown}
        className={cn(treeItemBase, selected && treeItemSelected)}
      >
        <TreeIndent depth={depth} />
        <TreeChevron expanded={expanded} onToggle={expandable ? onToggle : undefined} />
        {icon}
        <TreeLabel>{label}</TreeLabel>
        {actions}
      </div>
      {children}
    </div>
  );
}
