"use client";

import type * as React from "react";
import { Search, Filter, Trash2 } from "lucide-react";

import { IconButton } from "@/components/ui/icon-button";

/**
 * UzCode AI — PanelToolbar (shared, not exported from the feature
 * barrel — internal helper)
 * Search/Filter/Clear are placeholders across every panel that needs
 * them (Output, Debug Console, Problems, Logs) — building this once
 * avoids repeating the same three inert buttons four times.
 */
export function PanelToolbar({ children }: { children?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-1 border-b border-border px-2 py-1.5">
      {children}
      <div className="flex-1" />
      <IconButton aria-label="Search" variant="ghost" size="sm" className="h-6 w-6" icon={<Search className="h-3.5 w-3.5" />} />
      <IconButton aria-label="Filter" variant="ghost" size="sm" className="h-6 w-6" icon={<Filter className="h-3.5 w-3.5" />} />
      <IconButton aria-label="Clear" variant="ghost" size="sm" className="h-6 w-6" icon={<Trash2 className="h-3.5 w-3.5" />} />
    </div>
  );
}
