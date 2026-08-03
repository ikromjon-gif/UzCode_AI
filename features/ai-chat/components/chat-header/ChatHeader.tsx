"use client";

import { Pin } from "lucide-react";

import { useChatStore } from "../../store/chat-store";

export function ChatHeader() {
  const currentChat = useChatStore((s) => s.chats.find((c) => c.id === s.currentChatId));

  return (
    <div className="flex h-11 shrink-0 items-center gap-2 border-b border-border px-3">
      {currentChat?.pinned ? <Pin className="h-3.5 w-3.5 text-primary" aria-hidden="true" /> : null}
      <span className="truncate text-sm font-medium text-foreground">{currentChat?.title ?? "AI Chat"}</span>
    </div>
  );
}
