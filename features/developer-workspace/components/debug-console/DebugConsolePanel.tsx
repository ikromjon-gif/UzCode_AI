"use client";

import * as React from "react";
import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

import { PanelToolbar } from "../PanelToolbar";

const sampleGroups = [
  { id: "g1", label: "console.log output", lines: ["Component mounted", "Props: { id: 1 }"] },
  { id: "g2", label: "Stack trace", lines: ["at Object.<anonymous> (index.ts:12)", "at Module._compile (module.js:456)"] },
];

/**
 * UzCode AI — DebugConsolePanel
 * UI only — no debugger attached, no real console stream. Collapse/
 * expand is real local UI state (per-group), the content is static.
 */
export function DebugConsolePanel() {
  const [expanded, setExpanded] = React.useState<Record<string, boolean>>({ g1: true });

  return (
    <div className="flex h-full flex-col">
      <PanelToolbar />
      <ScrollArea className="flex-1">
        <div className="flex flex-col p-2 font-mono text-xs">
          {sampleGroups.map((group) => {
            const isOpen = expanded[group.id] ?? false;
            return (
              <div key={group.id}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setExpanded((s) => ({ ...s, [group.id]: !isOpen }))}
                  className="flex w-full items-center gap-1.5 rounded-[calc(var(--radius-input)/3)] px-1.5 py-1 text-left text-muted-foreground hover:bg-muted focus-ring"
                >
                  <ChevronRight className={cn("h-3 w-3 transition-transform duration-[var(--duration-fast)]", isOpen && "rotate-90")} aria-hidden="true" />
                  {group.label}
                </button>
                {isOpen ? (
                  <div className="ml-5 flex flex-col gap-0.5 py-1 text-foreground">
                    {group.lines.map((line, i) => (
                      <span key={i}>{line}</span>
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
