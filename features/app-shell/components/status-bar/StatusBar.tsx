import { GitBranch, Sparkles, Wifi } from "lucide-react";

import { statusBarBase, statusItemBase, statusDotBase } from "./status-bar.styles";
import type { StatusBarProps } from "./status-bar.types";

/**
 * UzCode AI — StatusBar
 * All values are static placeholders — no real git/AI/connection
 * state yet (that arrives with Sprint 14 Git Integration and
 * Sprint 15 AI Gateway).
 */
export function StatusBar({ gitBranch = "main", workspaceName = "UzCode AI" }: StatusBarProps) {
  return (
    <div className={statusBarBase} role="group" aria-label="Workspace status">
      <span className={statusItemBase}>
        <GitBranch className="h-3.5 w-3.5" aria-hidden="true" />
        {gitBranch}
      </span>
      <span className={statusItemBase}>
        <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
        AI: Idle
      </span>
      <span className={statusItemBase}>
        <Wifi className="h-3.5 w-3.5" aria-hidden="true" />
        <span className={`${statusDotBase} bg-success`} aria-hidden="true" />
        Connected
      </span>
      <div className="flex-1" />
      <span>{workspaceName}</span>
    </div>
  );
}
