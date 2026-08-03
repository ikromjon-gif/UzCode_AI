"use client";

import * as React from "react";
import { MessageSquare } from "lucide-react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { EmptyState } from "@/components/ui/empty-state";

import { MessageItem } from "./MessageItem";
import type { ChatMessage } from "../../types/chat.types";

/**
 * UzCode AI — MessageList
 * Virtualization-ready: the `.map()` below makes no assumption about
 * list length. Swapping it for a windowed renderer later (e.g.
 * react-window) doesn't change MessageItem's contract — same pattern
 * used for Sprint 5's Tree.
 */
export function MessageList({ messages }: { messages: ChatMessage[] }) {
  const bottomRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: "end" });
  }, [messages.length]);

  if (messages.length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <EmptyState icon={<MessageSquare aria-hidden="true" />} title="No messages yet" description="Start the conversation below." />
      </div>
    );
  }

  return (
    <ScrollArea className="h-full">
      <div role="log" aria-label="Conversation" aria-live="polite" className="flex flex-col gap-4 p-4">
        {messages.map((message) => (
          <MessageItem key={message.id} message={message} />
        ))}
        <div ref={bottomRef} />
      </div>
    </ScrollArea>
  );
}
