import { Wrench, CheckCircle2, Loader2 } from "lucide-react";

import type { ToolCall } from "../../types/chat.types";

/** UzCode AI — ToolCallPlaceholder. Visual shape only — no real tool execution. */
export function ToolCallPlaceholder({ toolCall, label }: { toolCall: ToolCall; label: string }) {
  const StatusIcon = toolCall.status === "done" ? CheckCircle2 : Loader2;

  return (
    <div className="flex items-center gap-2 rounded-input border border-border bg-muted/40 px-3 py-2 text-sm text-muted-foreground">
      <Wrench className="h-4 w-4" aria-hidden="true" />
      <span className="font-mono text-xs">{toolCall.name}</span>
      <span className="flex-1 truncate">{label}</span>
      <StatusIcon className={toolCall.status !== "done" ? "h-4 w-4 animate-spin" : "h-4 w-4 text-success"} aria-hidden="true" />
    </div>
  );
}
