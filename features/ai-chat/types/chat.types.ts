export type MessageRole = "user" | "assistant" | "system";
export type MessageStatus = "complete" | "thinking" | "tool-call";

export interface ToolCall {
  id: string;
  name: string;
  status: "pending" | "running" | "done";
}

export interface Attachment {
  id: string;
  name: string;
  kind: "file" | "image";
}

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string; // Markdown
  status: MessageStatus;
  createdAt: string; // ISO timestamp
  toolCall?: ToolCall;
  attachments?: Attachment[];
  liked?: boolean;
  disliked?: boolean;
}

export interface Chat {
  id: string;
  title: string;
  messages: ChatMessage[];
  pinned: boolean;
  modelId: string;
  updatedAt: string;
}

export interface AiModel {
  id: string;
  label: string;
  provider: string;
}
