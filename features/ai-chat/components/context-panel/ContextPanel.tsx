import { FolderTree, FileCheck2, Pin, Database, History } from "lucide-react";

/**
 * UzCode AI — ContextPanel
 * 5 static sections per spec — no functionality. Each one shows
 * inert placeholder content rather than a real data connection.
 */
function Section({ icon: Icon, title, description }: { icon: typeof FolderTree; title: string; description: string }) {
  return (
    <div className="border-b border-border p-3">
      <div className="mb-1.5 flex items-center gap-2">
        <Icon className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
        <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{title}</span>
      </div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  );
}

export function ContextPanel() {
  return (
    <div className="flex h-full flex-col overflow-auto">
      <Section icon={FolderTree} title="Workspace Context" description="No workspace context attached yet." />
      <Section icon={FileCheck2} title="Selected Files" description="No files selected." />
      <Section icon={Pin} title="Pinned Context" description="Pin a message or file to keep it in context." />
      <Section icon={Database} title="Project Memory" description="Project memory ships in a later sprint." />
      <Section icon={History} title="Conversation Memory" description="Conversation memory ships in a later sprint." />
    </div>
  );
}
