"use client";

import { WorkspaceLayout } from "@/features/app-shell";

import { ConversationSidebar } from "../conversation-sidebar";
import { ContextPanel } from "../context-panel";
import { ChatHeader } from "../chat-header";
import { ChatFooter } from "../chat-footer";
import { MessageList } from "../chat-messages";
import { PromptComposer } from "../prompt-composer";
import { useChatStore } from "../../store/chat-store";

/**
 * UzCode AI — AiChatShell
 * Reuses Sprint 4's WorkspaceLayout for the 3-pane shape (left =
 * ConversationSidebar, center = chat area, right = ContextPanel) —
 * same reasoning as Sprint 5/6, avoids a fourth panel-layout
 * implementation.
 */
export function AiChatShell() {
  const messages = useChatStore((s) => s.chats.find((c) => c.id === s.currentChatId)?.messages ?? []);

  return (
    <WorkspaceLayout
      left={<ConversationSidebar />}
      center={
        <div className="flex h-full flex-col">
          <ChatHeader />
          <div className="min-h-0 flex-1">
            <MessageList messages={messages} />
          </div>
          <PromptComposer />
          <ChatFooter />
        </div>
      }
      right={<ContextPanel />}
    />
  );
}
