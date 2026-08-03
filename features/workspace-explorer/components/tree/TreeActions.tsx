import type * as React from "react";

import { cn } from "@/lib/utils";

import { treeActionsBase } from "./tree.styles";

/**
 * UzCode AI — TreeActions
 * Wraps per-row action triggers (e.g. the context-menu kebab button).
 * Hidden until the row is hovered/focused/selected — standard file-
 * explorer convention that keeps the tree visually quiet at rest.
 */
export function TreeActions({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn(treeActionsBase, className)}>{children}</span>;
}
