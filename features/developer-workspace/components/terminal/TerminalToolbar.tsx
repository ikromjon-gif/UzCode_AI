"use client";

import { Search, Trash2, Copy, Settings2 } from "lucide-react";

import { IconButton } from "@/components/ui/icon-button";

/** UzCode AI — TerminalToolbar. Every action is an inert placeholder — no command execution. */
export function TerminalToolbar() {
  return (
    <div className="flex items-center gap-0.5 border-b border-border px-2 py-1">
      <span className="mr-auto font-mono text-xs text-muted-foreground">bash</span>
      <IconButton aria-label="Search terminal" variant="ghost" size="sm" className="h-6 w-6" icon={<Search className="h-3.5 w-3.5" />} />
      <IconButton aria-label="Copy terminal output" variant="ghost" size="sm" className="h-6 w-6" icon={<Copy className="h-3.5 w-3.5" />} />
      <IconButton aria-label="Clear terminal" variant="ghost" size="sm" className="h-6 w-6" icon={<Trash2 className="h-3.5 w-3.5" />} />
      <IconButton aria-label="Terminal settings" variant="ghost" size="sm" className="h-6 w-6" icon={<Settings2 className="h-3.5 w-3.5" />} />
    </div>
  );
}
