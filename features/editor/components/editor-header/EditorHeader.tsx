import { Lock } from "lucide-react";

import { Badge } from "@/components/ui/badge";

import { getLanguageLabel } from "../../config/supported-languages";

/**
 * UzCode AI — EditorHeader
 * All values are placeholders/derived-but-static — Encoding and Line
 * Ending are fixed display values, not read from a real file yet.
 */
export function EditorHeader({
  filePath,
  language,
  readOnly = false,
}: {
  filePath: string;
  language: string;
  readOnly?: boolean;
}) {
  return (
    <div className="flex h-8 shrink-0 items-center gap-3 border-b border-border px-3 text-xs text-muted-foreground">
      <span className="truncate font-medium text-foreground">{filePath}</span>
      <div className="flex-1" />
      <Badge variant="outline">{getLanguageLabel(language)}</Badge>
      <span>UTF-8</span>
      <span>LF</span>
      {readOnly ? (
        <span className="flex items-center gap-1">
          <Lock className="h-3 w-3" aria-hidden="true" />
          Read Only
        </span>
      ) : null}
    </div>
  );
}
