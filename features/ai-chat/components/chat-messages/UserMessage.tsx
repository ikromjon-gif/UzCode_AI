import { Avatar } from "@/components/ui/avatar";

import { MessageTimestamp } from "./MessageTimestamp";
import { MessageActions } from "./MessageActions";
import type { ChatMessage } from "../../types/chat.types";

/** UzCode AI — UserMessage. Right-aligned bubble, matches common chat UI convention. */
export function UserMessage({ message }: { message: ChatMessage }) {
  return (
    <div className="group flex items-start justify-end gap-3">
      <div className="flex max-w-[75%] flex-col items-end gap-1">
        <div className="whitespace-pre-wrap rounded-card bg-primary px-4 py-2.5 text-sm text-primary-foreground">
          {message.content}
        </div>
        <div className="flex items-center gap-2">
          <MessageActions content={message.content} />
          <MessageTimestamp iso={message.createdAt} />
        </div>
      </div>
      <Avatar size="sm" fallback="U" alt="" />
    </div>
  );
}
