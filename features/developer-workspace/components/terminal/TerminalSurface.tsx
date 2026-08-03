"use client";

import * as React from "react";

/**
 * UzCode AI — TerminalSurface (mount-point, xterm NOT initialized)
 *
 * This is the element a future sprint will pass to
 * `new Terminal(xtermOptions).open(surfaceRef.current)`. The ref is
 * wired and ready; nothing from "@xterm/xterm" is imported or called
 * here. See config/xterm.config.ts for the prepared theme/options.
 */
export function TerminalSurface() {
  const surfaceRef = React.useRef<HTMLDivElement>(null);

  return (
    <div
      ref={surfaceRef}
      role="log"
      aria-label="Terminal output"
      className="h-full overflow-auto bg-card p-3 font-mono text-xs text-foreground"
    >
      <p className="text-muted-foreground">
        Terminal ready. Command execution is not implemented in this sprint.
      </p>
      <p className="mt-1 flex items-center gap-1.5">
        <span className="text-primary">$</span>
        <span className="inline-block h-3.5 w-1.5 animate-pulse bg-foreground" aria-hidden="true" />
      </p>
    </div>
  );
}
