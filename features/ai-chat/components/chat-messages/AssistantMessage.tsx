import { Sparkles } from "lucide-react";

import { MarkdownRenderer } from "../markdown-renderer";
import { MessageTimestamp } from "./MessageTimestamp";
import { MessageActions } from "./MessageActions";
import { ThinkingPlaceholder } from "./ThinkingPlaceholder";
import { ToolCallPlaceholder } from "./ToolCallPlaceholder";
import { MessageAttachment } from "./MessageAttachment";
import type { ChatMessage } from "../../types/chat.types";

/**
 * UzCode AI — AssistantMessage
 * Dispatches on `status`: thinking/tool-call render their respective
 * placeholders instead of Markdown content (mirrors what a real
 * streaming response would show at each stage, without any streaming
 * actually happening).
 */
export function AssistantMessage({ message }: { message: ChatMessage }) {
  return (
    <div className="group flex items-start gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-avatar bg-accent/10 text-accent">
        <Sparkles className="h-4 w-4" aria-hidden="true" />
      </div>
      <div className="flex max-w-[85%] flex-col gap-1">
        <div className="rounded-card border border-border bg-card px-4 py-2.5">
          {message.status === "thinking" ? (
            <ThinkingPlaceholder label={message.content} />
          ) : message.status === "tool-call" && message.toolCall ? (
            <ToolCallPlaceholder toolCall={message.toolCall} label={message.content} />
          ) : (
            <MarkdownRenderer content={message.content} />
          )}
        </div>

        {message.attachments?.length ? (
          <div className="flex flex-col gap-1.5">
            {message.attachments.map((a) => (
              <MessageAttachment key={a.id} attachment={a} />
            ))}
          </div>
        ) : null}

        {message.status === "complete" ? (
          <div className="flex items-center gap-2">
            <MessageActions content={message.content} showAssistantActions liked={message.liked} disliked={message.disliked} />
            <MessageTimestamp iso={message.createdAt} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
