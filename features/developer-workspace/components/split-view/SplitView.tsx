"use client";

import type * as React from "react";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";
import { IconButton } from "@/components/ui/icon-button";

import type { SplitDirection } from "../../types/preview.types";

/**
 * UzCode AI — SplitView
 * Generic two-pane layout — horizontal (side-by-side) or vertical
 * (stacked), fixed 55/45 ratio, secondary pane collapsible via
 * `onCloseSecondary`. NOT drag-resizable — same "foundation, not
 * interaction-complete" boundary as Sprint 4's WorkspaceLayout and
 * Sprint 5/6's panel collapse. Written generically enough to be a
 * reasonable future components/ui/ candidate, though it stays
 * feature-local for now since only Developer Workspace requested it.
 */
export function SplitView({
  primary,
  secondary,
  direction,
  onCloseSecondary,
}: {
  primary: React.ReactNode;
  secondary: React.ReactNode;
  direction: SplitDirection;
  onCloseSecondary?: () => void;
}) {
  return (
    <div className={cn("flex h-full min-h-0 w-full", direction === "horizontal" ? "flex-row" : "flex-col")}>
      <div className={cn("min-h-0 min-w-0", direction === "horizontal" ? "w-[55%]" : "h-[55%]")}>{primary}</div>
      <div
        className={cn(
          "min-h-0 min-w-0 flex-1 border-border",
          direction === "horizontal" ? "border-l" : "border-t",
        )}
      >
        <div className="relative h-full">
          {onCloseSecondary ? (
            <IconButton
              aria-label="Close split pane"
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1 z-[var(--z-sticky)] h-6 w-6"
              icon={<X className="h-3.5 w-3.5" />}
              onClick={onCloseSecondary}
            />
          ) : null}
          {secondary}
        </div>
      </div>
    </div>
  );
}
