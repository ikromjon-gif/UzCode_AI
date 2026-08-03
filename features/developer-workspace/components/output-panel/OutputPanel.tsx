"use client";

import * as React from "react";

import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";

import { PanelToolbar } from "../PanelToolbar";
import { sampleOutputLines } from "../../constants/sample-output";
import type { OutputChannel } from "../../types/panel.types";

const channels: { id: OutputChannel; label: string }[] = [
  { id: "application", label: "Application" },
  { id: "build", label: "Build" },
  { id: "task", label: "Task" },
  { id: "extension", label: "Extension" },
];

/**
 * UzCode AI — OutputPanel
 * Channel switcher is real UI state (local); the log lines
 * themselves are static demo data — no real process ever writes here.
 */
export function OutputPanel() {
  const [channel, setChannel] = React.useState<OutputChannel>("build");
  const lines = sampleOutputLines.filter((l) => l.channel === channel);

  return (
    <div className="flex h-full flex-col">
      <PanelToolbar>
        <Select value={channel} onValueChange={(v) => setChannel(v as OutputChannel)}>
          <SelectTrigger size="sm" className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {channels.map((c) => (
              <SelectItem key={c.id} value={c.id}>
                {c.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {/* Auto Scroll Placeholder */}
        <span className="ml-2 text-xs text-muted-foreground">Auto-scroll</span>
      </PanelToolbar>
      <ScrollArea className="flex-1">
        <div className="p-3 font-mono text-xs text-foreground">
          {lines.length === 0 ? (
            <p className="text-muted-foreground">No output for this channel.</p>
          ) : (
            lines.map((line) => <div key={line.id}>{line.text}</div>)
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
