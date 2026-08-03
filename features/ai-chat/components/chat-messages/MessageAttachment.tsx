import { FileText, Image as ImageIcon } from "lucide-react";

import type { Attachment } from "../../types/chat.types";

/** UzCode AI — MessageAttachment. Visual placeholder — no real file/image content is loaded. */
export function MessageAttachment({ attachment }: { attachment: Attachment }) {
  const Icon = attachment.kind === "image" ? ImageIcon : FileText;
  return (
    <div className="flex items-center gap-2 rounded-input border border-border bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
      <Icon className="h-4 w-4" aria-hidden="true" />
      <span className="truncate">{attachment.name}</span>
    </div>
  );
}
