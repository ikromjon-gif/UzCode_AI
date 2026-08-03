"use client";

import * as React from "react";
import { ChevronRight, XCircle, AlertTriangle, Info } from "lucide-react";

import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

import { PanelToolbar } from "../PanelToolbar";
import { sampleProblems } from "../../constants/sample-problems";
import type { ProblemSeverity } from "../../types/panel.types";

const severityConfig: Record<ProblemSeverity, { icon: typeof XCircle; label: string; badgeVariant: "destructive" | "warning" | "accent" }> = {
  error: { icon: XCircle, label: "Errors", badgeVariant: "destructive" },
  warning: { icon: AlertTriangle, label: "Warnings", badgeVariant: "warning" },
  info: { icon: Info, label: "Info", badgeVariant: "accent" },
};

/**
 * UzCode AI — ProblemsPanel
 * Grouped by severity, expand/collapse per group is real local UI
 * state. No diagnostics engine runs — sampleProblems is static.
 */
export function ProblemsPanel() {
  const [expanded, setExpanded] = React.useState<Record<ProblemSeverity, boolean>>({ error: true, warning: true, info: false });

  return (
    <div className="flex h-full flex-col">
      <PanelToolbar />
      <ScrollArea className="flex-1">
        <div className="flex flex-col p-2 text-sm">
          {(Object.keys(severityConfig) as ProblemSeverity[]).map((severity) => {
            const items = sampleProblems.filter((p) => p.severity === severity);
            const config = severityConfig[severity];
            const Icon = config.icon;
            const isOpen = expanded[severity];

            return (
              <div key={severity}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setExpanded((s) => ({ ...s, [severity]: !isOpen }))}
                  className="flex w-full items-center gap-1.5 rounded-[calc(var(--radius-input)/3)] px-1.5 py-1.5 text-left text-foreground hover:bg-muted focus-ring"
                >
                  <ChevronRight className={cn("h-3 w-3 shrink-0 transition-transform duration-[var(--duration-fast)]", isOpen && "rotate-90")} aria-hidden="true" />
                  <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span className="flex-1">{config.label}</span>
                  <Badge variant={config.badgeVariant}>{items.length}</Badge>
                </button>
                {isOpen && items.length > 0 ? (
                  <div className="ml-6 flex flex-col gap-1 py-1">
                    {items.map((problem) => (
                      <div key={problem.id} className="text-xs text-muted-foreground">
                        <span className="text-foreground">{problem.message}</span>
                        <span className="ml-2 font-mono">{problem.file}:{problem.line}</span>
                      </div>
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
