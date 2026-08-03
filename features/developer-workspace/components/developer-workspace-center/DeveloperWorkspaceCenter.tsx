"use client";

import { MonitorPlay, PanelBottom, PanelRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { IconButton } from "@/components/ui/icon-button";
import { EditorShell } from "@/features/editor";

import { SplitView } from "../split-view";
import { LivePreview } from "../live-preview";
import { useDeveloperWorkspaceStore } from "../../store/developer-workspace-store";

/**
 * UzCode AI — DeveloperWorkspaceCenter
 * Fills WorkspaceExplorerShell's center slot (Sprint 5/6 precedent).
 * Renders EditorShell alone, or EditorShell + LivePreview via
 * SplitView when the preview toggle is on. Owns a thin toolbar strip
 * (separate from EditorHeader/EditorTabs, which belong to the editor
 * itself) so this integration doesn't touch Sprint 6's approved files.
 */
export function DeveloperWorkspaceCenter() {
  const previewVisible = useDeveloperWorkspaceStore((s) => s.previewVisible);
  const togglePreview = useDeveloperWorkspaceStore((s) => s.togglePreview);
  const splitDirection = useDeveloperWorkspaceStore((s) => s.splitDirection);
  const setSplitDirection = useDeveloperWorkspaceStore((s) => s.setSplitDirection);

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-7 shrink-0 items-center justify-end gap-0.5 border-b border-border px-1">
        {previewVisible ? (
          <>
            <IconButton
              aria-label="Split horizontally"
              variant={splitDirection === "horizontal" ? "primary" : "ghost"}
              size="sm"
              className="h-5 w-5"
              icon={<PanelRight className="h-3 w-3" />}
              onClick={() => setSplitDirection("horizontal")}
            />
            <IconButton
              aria-label="Split vertically"
              variant={splitDirection === "vertical" ? "primary" : "ghost"}
              size="sm"
              className="h-5 w-5"
              icon={<PanelBottom className="h-3 w-3" />}
              onClick={() => setSplitDirection("vertical")}
            />
          </>
        ) : null}
        <IconButton
          aria-label={previewVisible ? "Hide live preview" : "Show live preview"}
          variant={previewVisible ? "primary" : "ghost"}
          size="sm"
          className={cn("h-5 w-5")}
          icon={<MonitorPlay className="h-3 w-3" />}
          onClick={togglePreview}
        />
      </div>

      <div className="min-h-0 flex-1">
        {previewVisible ? (
          <SplitView
            direction={splitDirection}
            primary={<EditorShell />}
            secondary={<LivePreview />}
            onCloseSecondary={togglePreview}
          />
        ) : (
          <EditorShell />
        )}
      </div>
    </div>
  );
}
