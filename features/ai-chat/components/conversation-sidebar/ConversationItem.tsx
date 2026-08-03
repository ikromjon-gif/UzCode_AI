"use client";

import { cn } from "@/lib/utils";

import { useChatStore } from "../../store/chat-store";
import { ConversationContextMenu } from "./ConversationContextMenu";
import type { Chat } from "../../types/chat.types";

export function ConversationItem({ chat }: { chat: Chat }) {
  const isActive = useChatStore((s) => s.currentChatId === chat.id);
  const setCurrentChat = useChatStore((s) => s.setCurrentChat);

  return (
    <div
      role="button"
      tabIndex={0}
      aria-current={isActive ? "true" : undefined}
      onClick={() => setCurrentChat(chat.id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setCurrentChat(chat.id);
        }
      }}
      className={cn(
        "group flex h-8 w-full cursor-pointer items-center gap-2 rounded-button px-2 text-sm transition-colors duration-[var(--duration-fast)] focus-ring",
        isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground",
      )}
    >
      <span className="flex-1 truncate">{chat.title}</span>
      <ConversationContextMenu chatId={chat.id} pinned={chat.pinned} label={chat.title} />
    </div>
  );
}
