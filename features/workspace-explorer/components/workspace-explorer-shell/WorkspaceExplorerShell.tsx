"use client";

import { WorkspaceLayout } from "@/features/app-shell";
import { DeveloperWorkspaceCenter } from "@/features/developer-workspace";

import { ExplorerPanel } from "../explorer-panel";
import { RightPanel } from "../right-panel";
import { BottomPanel } from "../bottom-panel";
import { useWorkspaceStore } from "../../store/workspace-store";
import { mockFileTree } from "../../constants/mock-file-tree";

/**
 * UzCode AI — WorkspaceExplorerShell
 * Composes Sprint 4's WorkspaceLayout (left = Explorer, center =
 * DeveloperWorkspaceCenter, right = RightPanel) with a BottomPanel
 * stacked below. Sprint 8 replaces the bare EditorShell in the
 * center slot with DeveloperWorkspaceCenter, which renders EditorShell
 * plus an optional Live Preview split — same "fill the center slot"
 * precedent as Sprint 6/7.
 */
export function WorkspaceExplorerShell() {
  const bottomPanelVisible = useWorkspaceStore((s) => s.bottomPanelVisible);

  return (
    <div className="flex h-full flex-col">
      <div className="min-h-0 flex-1">
        <WorkspaceLayout
          left={<ExplorerPanel nodes={mockFileTree} />}
          center={<DeveloperWorkspaceCenter />}
          right={<RightPanel />}
        />
      </div>
      {bottomPanelVisible ? (
        <div className="h-56 shrink-0">
          <BottomPanel />
        </div>
      ) : null}
    </div>
  );
}
