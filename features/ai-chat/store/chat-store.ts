"use client";

import { create } from "zustand";

import type { Chat, ChatMessage } from "../types/chat.types";
import { sampleChats } from "../constants/sample-conversation";

/**
 * UzCode AI — Chat Store
 * Pure UI state, no persist middleware, no backend. `sendMessage`
 * appends ONLY the user's own message — it never fabricates an
 * assistant reply, per this sprint's explicit "no AI provider,
 * no streaming" scope. Assistant/system/thinking/tool-call messages
 * exist solely as static seed data (sample-conversation.ts).
 */
export interface ContextState {
  selectedFileIds: string[];
  pinnedContextIds: string[];
}

interface ChatState {
  chats: Chat[];
  currentChatId: string | null;
  selectedModelId: string;
  composerValue: string;
  context: ContextState;

  createChat: () => void;
  deleteChat: (id: string) => void;
  renameChat: (id: string, title: string) => void;
  togglePinChat: (id: string) => void;
  setCurrentChat: (id: string) => void;
  setSelectedModel: (id: string) => void;
  setComposerValue: (value: string) => void;
  sendMessage: (content: string) => void;
}

function createEmptyChat(): Chat {
  return {
    id: `chat-${Date.now()}`,
    title: "New Chat",
    messages: [],
    pinned: false,
    modelId: "claude",
    updatedAt: new Date().toISOString(),
  };
}

export const useChatStore = create<ChatState>((set, get) => ({
  chats: sampleChats,
  currentChatId: sampleChats[0]?.id ?? null,
  selectedModelId: "claude",
  composerValue: "",
  context: { selectedFileIds: [], pinnedContextIds: [] },

  createChat: () => {
    const chat = createEmptyChat();
    set((state) => ({ chats: [chat, ...state.chats], currentChatId: chat.id }));
  },

  deleteChat: (id) =>
    set((state) => {
      const chats = state.chats.filter((c) => c.id !== id);
      const currentChatId = state.currentChatId === id ? (chats[0]?.id ?? null) : state.currentChatId;
      return { chats, currentChatId };
    }),

  renameChat: (id, title) =>
    set((state) => ({
      chats: state.chats.map((c) => (c.id === id ? { ...c, title } : c)),
    })),

  togglePinChat: (id) =>
    set((state) => ({
      chats: state.chats.map((c) => (c.id === id ? { ...c, pinned: !c.pinned } : c)),
    })),

  setCurrentChat: (id) => set({ currentChatId: id }),
  setSelectedModel: (id) => set({ selectedModelId: id }),
  setComposerValue: (value) => set({ composerValue: value }),

  sendMessage: (content) => {
    const { currentChatId, chats } = get();
    if (!currentChatId || !content.trim()) return;

    const message: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: "user",
      status: "complete",
      createdAt: new Date().toISOString(),
      content,
    };

    set({
      chats: chats.map((c) =>
        c.id === currentChatId
          ? { ...c, messages: [...c.messages, message], updatedAt: message.createdAt }
          : c,
      ),
      composerValue: "",
    });
  },
}));
