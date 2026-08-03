import { FolderOpen, FolderPlus } from "lucide-react";

import { Button } from "@/components/ui/button";

/**
 * UzCode AI — EditorPlaceholder
 * Shown by EditorShell when there are zero open tabs. Originally
 * built in Sprint 5 inside workspace-explorer; moved here in Sprint 6
 * since EditorShell (the only consumer) needed it and importing it
 * from workspace-explorer would have created a circular dependency
 * (workspace-explorer → editor → workspace-explorer). No editor,
 * no CodeMirror, no editing logic — just the welcome state and two
 * inert action buttons.
 */
export function EditorPlaceholder() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 p-8 text-center">
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-2xl font-semibold text-foreground">Welcome to UzCode AI</h2>
        <p className="max-w-md text-sm text-muted-foreground">
          Open a folder or start a new project to begin. The code editor arrives in a later sprint —
          this screen is a layout placeholder.
        </p>
      </div>

      <div className="flex gap-3">
        <Button variant="primary" leftIcon={<FolderOpen className="h-4 w-4" aria-hidden="true" />}>
          Open Folder
        </Button>
        <Button variant="outline" leftIcon={<FolderPlus className="h-4 w-4" aria-hidden="true" />}>
          Open Project
        </Button>
      </div>

      <div className="w-full max-w-sm border-t border-border pt-6">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Recent Projects
        </p>
        <p className="text-sm text-muted-foreground">No recent projects yet.</p>
      </div>
    </div>
  );
}
