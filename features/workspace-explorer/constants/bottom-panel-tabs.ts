import { TerminalSquare, ScrollText, Bug, AlertTriangle, FileClock, Radio } from "lucide-react";

import type { PanelModule } from "../types/workspace.types";

/** UzCode AI — Bottom panel tabs. All content panes are placeholders this sprint. */
export const bottomPanelTabs: PanelModule[] = [
  { id: "terminal", label: "Terminal", icon: TerminalSquare },
  { id: "output", label: "Output", icon: ScrollText },
  { id: "debug-console", label: "Debug Console", icon: Bug },
  { id: "problems", label: "Problems", icon: AlertTriangle },
  { id: "logs", label: "Logs", icon: FileClock },
  { id: "ports", label: "Ports", icon: Radio },
];
