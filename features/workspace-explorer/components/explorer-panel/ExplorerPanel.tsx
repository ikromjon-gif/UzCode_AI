"use client";

import { Search, FilePlus, FolderPlus, FolderOpen } from "lucide-react";

import { IconButton } from "@/components/ui/icon-button";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";

import { Tree } from "../tree";
import { WorkspaceNav } from "../workspace-nav";
import type { ExplorerPanelProps } from "./explorer-panel.types";

/**
 * UzCode AI — ExplorerPanel
 * Composes WorkspaceNav (Recent/Favorites/Pinned/Open Editors) above
 * the file Tree, plus a header with placeholder search and new-file/
 * new-folder actions (inert — no handlers wired).
 */
export function ExplorerPanel({ nodes, isLoading = false }: ExplorerPanelProps) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-border px-3 py-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Explorer</span>
        <div className="flex items-center gap-0.5">
          <IconButton aria-label="New file" variant="ghost" size="sm" icon={<FilePlus className="h-3.5 w-3.5" />} className="h-6 w-6" />
          <IconButton aria-label="New folder" variant="ghost" size="sm" icon={<FolderPlus className="h-3.5 w-3.5" />} className="h-6 w-6" />
        </div>
      </div>

      {/* Search Placeholder — no filtering logic */}
      <div className="flex items-center gap-2 border-b border-border px-3 py-2 text-sm text-muted-foreground">
        <Search className="h-3.5 w-3.5" aria-hidden="true" />
        <span>Search files…</span>
      </div>

      <WorkspaceNav />

      <div className="flex-1 overflow-auto">
        {isLoading ? (
          <div className="flex flex-col gap-2 p-3" aria-label="Loading file tree">
            <Skeleton className="h-6 w-full" radius="input" />
            <Skeleton className="h-6 w-5/6" radius="input" />
            <Skeleton className="h-6 w-3/4" radius="input" />
            <Skeleton className="h-6 w-4/5" radius="input" />
          </div>
        ) : nodes.length === 0 ? (
          <EmptyState
            icon={<FolderOpen aria-hidden="true" />}
            title="No folder open"
            description="Open a project to see its files here."
          />
        ) : (
          <Tree nodes={nodes} aria-label="Project files" className="px-1 py-2" />
        )}
      </div>
    </div>
  );
}
