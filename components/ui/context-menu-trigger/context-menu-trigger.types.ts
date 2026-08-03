import type * as React from "react";

export interface ContextMenuTriggerProps {
  /** Used to build the trigger's aria-label: "More actions for {label}". */
  label: string;
  /** DropdownMenuItem elements (and separators) — the actual menu content. */
  children: React.ReactNode;
  /** Extra classes for the trigger button — callers control size/hover-reveal opacity. */
  triggerClassName?: string;
}
