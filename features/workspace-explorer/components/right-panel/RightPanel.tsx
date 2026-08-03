"use client";

import { IconButton } from "@/components/ui/icon-button";
import { SimpleTooltip, TooltipProvider } from "@/components/ui/tooltip";

import { useWorkspaceStore } from "../../store/workspace-store";
import { rightPanelModules } from "../../constants/right-panel-modules";

/**
 * UzCode AI — RightPanel
 * Vertical icon rail (AI Assistant/Properties/Git Changes/Outline/
 * Problems/Extensions) + a content pane that only ever shows a
 * "coming soon" message for the active module — no real module
 * content ships this sprint.
 */
export function RightPanel() {
  const activeId = useWorkspaceStore((s) => s.activeRightModuleId);
  const setActive = useWorkspaceStore((s) => s.setActiveRightModule);
  const activeModule = rightPanelModules.find((m) => m.id === activeId);

  return (
    <div className="flex h-full">
      <TooltipProvider delayDuration={300}>
        <div className="flex w-11 shrink-0 flex-col items-center gap-1 border-r border-border py-2">
          {rightPanelModules.map((module) => {
            const Icon = module.icon;
            return (
              <SimpleTooltip key={module.id} content={module.label} side="left">
                <IconButton
                  aria-label={module.label}
                  variant={module.id === activeId ? "primary" : "ghost"}
                  size="sm"
                  icon={<Icon className="h-4 w-4" />}
                  onClick={() => setActive(module.id)}
                />
              </SimpleTooltip>
            );
          })}
        </div>
      </TooltipProvider>

      <div className="flex-1 overflow-auto p-4">
        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {activeModule?.label}
        </p>
        <p className="text-sm text-muted-foreground">This module ships in a later sprint.</p>
      </div>
    </div>
  );
}
