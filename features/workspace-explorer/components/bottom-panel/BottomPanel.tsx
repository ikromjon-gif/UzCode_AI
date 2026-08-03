"use client";

import type * as React from "react";
import { ChevronDown } from "lucide-react";

import { IconButton } from "@/components/ui/icon-button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  TerminalPanel,
  OutputPanel,
  DebugConsolePanel,
  ProblemsPanel,
  LogsPanel,
  PortsPanel,
} from "@/features/developer-workspace";

import { useWorkspaceStore } from "../../store/workspace-store";
import { bottomPanelTabs } from "../../constants/bottom-panel-tabs";

/**
 * UzCode AI — BottomPanel
 * Sprint 8 replaces the Sprint 5 placeholder text for each tab with
 * the real panel components from features/developer-workspace — same
 * "fill in an earlier placeholder" pattern as Sprint 6/7.
 */
const panelById: Record<string, React.ComponentType> = {
  terminal: TerminalPanel,
  output: OutputPanel,
  "debug-console": DebugConsolePanel,
  problems: ProblemsPanel,
  logs: LogsPanel,
  ports: PortsPanel,
};

export function BottomPanel() {
  const activeId = useWorkspaceStore((s) => s.activeBottomTabId);
  const setActive = useWorkspaceStore((s) => s.setActiveBottomTab);
  const toggleBottomPanel = useWorkspaceStore((s) => s.toggleBottomPanel);

  return (
    <div className="flex h-full flex-col border-t border-border">
      <Tabs value={activeId} onValueChange={setActive} className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-border pr-1">
          <TabsList className="h-9 rounded-none border-0 bg-transparent p-0">
            {bottomPanelTabs.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id} className="rounded-none text-xs">
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <IconButton
            aria-label="Collapse bottom panel"
            variant="ghost"
            size="sm"
            icon={<ChevronDown className="h-4 w-4" />}
            onClick={toggleBottomPanel}
          />
        </div>

        {bottomPanelTabs.map((tab) => {
          const Panel = panelById[tab.id];
          return (
            <TabsContent key={tab.id} value={tab.id} className="mt-0 min-h-0 flex-1">
              {Panel ? <Panel /> : null}
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}
