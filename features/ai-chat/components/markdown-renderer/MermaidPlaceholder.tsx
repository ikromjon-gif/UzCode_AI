import { Workflow } from "lucide-react";

/**
 * UzCode AI — MermaidPlaceholder
 * Renders in place of a ```mermaid fenced block. No diagram library
 * is wired up — this sprint only reserves the visual slot.
 */
export function MermaidPlaceholder() {
  return (
    <div className="flex flex-col items-center gap-2 rounded-card border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
      <Workflow className="h-5 w-5" aria-hidden="true" />
      Diagram rendering ships in a later sprint.
    </div>
  );
}
