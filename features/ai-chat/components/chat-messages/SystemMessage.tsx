import { Info } from "lucide-react";

import type { ChatMessage } from "../../types/chat.types";

/** UzCode AI — SystemMessage. Centered, muted — distinct from the user/assistant conversation flow. */
export function SystemMessage({ message }: { message: ChatMessage }) {
  return (
    <div className="flex items-center justify-center gap-2 py-1 text-xs text-muted-foreground">
      <Info className="h-3.5 w-3.5" aria-hidden="true" />
      <span>{message.content}</span>
    </div>
  );
}
