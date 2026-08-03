import { TerminalTabs } from "./TerminalTabs";
import { TerminalToolbar } from "./TerminalToolbar";
import { TerminalSurface } from "./TerminalSurface";

/** UzCode AI — TerminalPanel. Composes Tabs + Toolbar + Surface. */
export function TerminalPanel() {
  return (
    <div className="flex h-full flex-col">
      <TerminalTabs />
      <TerminalToolbar />
      <div className="min-h-0 flex-1">
        <TerminalSurface />
      </div>
    </div>
  );
}
