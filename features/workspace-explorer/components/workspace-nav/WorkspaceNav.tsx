"use client";

import { Star, Pin, FileStack } from "lucide-react";

import { EmptyState } from "@/components/ui/empty-state";

import { NavSection } from "./NavSection";

/**
 * UzCode AI — WorkspaceNav
 * Recent Projects / Favorites / Pinned / Open Editors — UI foundation
 * only, all sections show their empty state since there's no backend
 * or open-file state to source real data from yet.
 */
export function WorkspaceNav() {
  return (
    <div>
      <NavSection title="Recent Projects">
        <p className="px-3 text-xs text-muted-foreground">No recent projects.</p>
      </NavSection>

      <NavSection title="Favorites">
        <div className="flex items-center gap-2 px-3 text-xs text-muted-foreground">
          <Star className="h-3 w-3" aria-hidden="true" />
          Star a file to pin it here.
        </div>
      </NavSection>

      <NavSection title="Pinned">
        <div className="flex items-center gap-2 px-3 text-xs text-muted-foreground">
          <Pin className="h-3 w-3" aria-hidden="true" />
          No pinned items.
        </div>
      </NavSection>

      <NavSection title="Open Editors" defaultOpen>
        <div className="px-3">
          <EmptyState
            icon={<FileStack aria-hidden="true" />}
            title="No open editors"
            className="border-0 p-4"
          />
        </div>
      </NavSection>
    </div>
  );
}
