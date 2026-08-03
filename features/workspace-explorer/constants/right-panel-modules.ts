import { Sparkles, SlidersHorizontal, GitBranch, ListTree, AlertTriangle, Puzzle } from "lucide-react";

import type { PanelModule } from "../types/workspace.types";

/** UzCode AI — Right panel module rail. All content panes are placeholders this sprint. */
export const rightPanelModules: PanelModule[] = [
  { id: "ai-assistant", label: "AI Assistant", icon: Sparkles },
  { id: "properties", label: "Properties", icon: SlidersHorizontal },
  { id: "git-changes", label: "Git Changes", icon: GitBranch },
  { id: "outline", label: "Outline", icon: ListTree },
  { id: "problems", label: "Problems", icon: AlertTriangle },
  { id: "extensions", label: "Extensions", icon: Puzzle },
];
