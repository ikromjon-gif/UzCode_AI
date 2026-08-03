"use client";

import * as React from "react";
import { PanelLeftClose, PanelLeftOpen, PanelRightClose, PanelRightOpen } from "lucide-react";

import { cn } from "@/lib/utils";
import { IconButton } from "@/components/ui/icon-button";
import { useUiStore } from "@/store";

import {
  workspaceLayoutBase,
  panelBase,
  panelWidthExpanded,
  panelWidthCollapsed,
  centerPanelBase,
} from "./workspace-layout.styles";
import type { WorkspaceLayoutProps } from "./workspace-layout.types";

/**
 * UzCode AI — WorkspaceLayout (foundation)
 * Three-slot layout: left / center / right. Collapse is supported
 * (toggle buttons + Zustand-backed state); drag-to-resize is NOT —
 * that's real interaction logic deferred to Sprint 9 (Workspace
 * Explorer), where there's an actual editor to resize around. Panel
 * widths are fixed constants for now, not user-adjustable.
 */
export function WorkspaceLayout({ left, center, right }: WorkspaceLayoutProps) {
  const leftCollapsed = useUiStore((s) => s.leftPanelCollapsed);
  const rightCollapsed = useUiStore((s) => s.rightPanelCollapsed);
  const toggleLeftPanel = useUiStore((s) => s.toggleLeftPanel);
  const toggleRightPanel = useUiStore((s) => s.toggleRightPanel);

  return (
    <div className={workspaceLayoutBase}>
      {left ? (
        <div className={cn(panelBase, "border-r", leftCollapsed ? panelWidthCollapsed : panelWidthExpanded)}>
          {left}
        </div>
      ) : null}

      <div className={centerPanelBase}>
        <div className="flex items-center gap-1 border-b border-border px-2 py-1">
          {left ? (
            <IconButton
              aria-label={leftCollapsed ? "Show left panel" : "Hide left panel"}
              variant="ghost"
              size="sm"
              icon={leftCollapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
              onClick={toggleLeftPanel}
            />
          ) : null}
          <div className="flex-1" />
          {right ? (
            <IconButton
              aria-label={rightCollapsed ? "Show right panel" : "Hide right panel"}
              variant="ghost"
              size="sm"
              icon={rightCollapsed ? <PanelRightOpen className="h-4 w-4" /> : <PanelRightClose className="h-4 w-4" />}
              onClick={toggleRightPanel}
            />
          ) : null}
        </div>
        {center}
      </div>

      {right ? (
        <div className={cn(panelBase, "border-l", rightCollapsed ? panelWidthCollapsed : panelWidthExpanded)}>
          {right}
        </div>
      ) : null}
    </div>
  );
}
