"use client";

import * as React from "react";
import { Download } from "lucide-react";

import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { IconButton } from "@/components/ui/icon-button";

import { PanelToolbar } from "../PanelToolbar";
import { sampleLogs } from "../../constants/sample-logs";
import type { LogSource } from "../../types/panel.types";

const sources: { id: LogSource; label: string }[] = [
  { id: "application", label: "Application" },
  { id: "system", label: "System" },
  { id: "ai", label: "AI (placeholder)" },
  { id: "workspace", label: "Workspace" },
];

const levelColor: Record<string, string> = {
  info: "text-muted-foreground",
  warn: "text-warning",
  error: "text-destructive",
};

/** UzCode AI — LogsPanel. Source tabs are real local UI state; log entries are static demo data. */
export function LogsPanel() {
  const [source, setSource] = React.useState<LogSource>("application");
  const entries = sampleLogs.filter((l) => l.source === source);

  return (
    <div className="flex h-full flex-col">
      <PanelToolbar>
        <div className="flex items-center gap-1">
          {sources.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setSource(s.id)}
              className={cn(
                "rounded-button px-2 py-1 text-xs font-medium transition-colors focus-ring",
                source === s.id ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted",
              )}
            >
              {s.label}
            </button>
          ))}
        </div>
      </PanelToolbar>
      <div className="flex items-center justify-end border-b border-border px-2 py-1">
        <IconButton aria-label="Download logs" variant="ghost" size="sm" className="h-6 w-6" icon={<Download className="h-3.5 w-3.5" />} />
      </div>
      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-1 p-3 font-mono text-xs">
          {entries.length === 0 ? (
            <p className="text-muted-foreground">No log entries.</p>
          ) : (
            entries.map((entry) => (
              <div key={entry.id} className={levelColor[entry.level]}>
                <span className="text-muted-foreground">[{new Date(entry.timestamp).toLocaleTimeString()}]</span> {entry.message}
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
