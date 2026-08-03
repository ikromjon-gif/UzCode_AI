import * as React from "react";

import { UserMessage } from "./UserMessage";
import { AssistantMessage } from "./AssistantMessage";
import { SystemMessage } from "./SystemMessage";
import type { ChatMessage } from "../../types/chat.types";

/**
 * UzCode AI — MessageItem
 * Role dispatcher, wrapped in React.memo — with a scoped list
 * (MessageList only re-renders when the messages array reference
 * changes), memoizing each row means editing the composer or
 * switching the selected model never re-renders the message list.
 */
function MessageItemImpl({ message }: { message: ChatMessage }) {
  switch (message.role) {
    case "user":
      return <UserMessage message={message} />;
    case "assistant":
      return <AssistantMessage message={message} />;
    case "system":
      return <SystemMessage message={message} />;
    default:
      return null;
  }
}

export const MessageItem = React.memo(MessageItemImpl);
