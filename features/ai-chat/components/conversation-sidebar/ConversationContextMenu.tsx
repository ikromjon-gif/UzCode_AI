"use client";

import { Pencil, Trash2, Star } from "lucide-react";

import { ContextMenuTrigger } from "@/components/ui/context-menu-trigger";
import { DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

import { useChatStore } from "../../store/chat-store";

/**
 * UzCode AI — ConversationContextMenu
 * Favorite (pin) is real — writes to chat-store. Rename and Delete
 * are UI placeholders. Trigger shell is shared
 * (components/ui/context-menu-trigger).
 */
export function ConversationContextMenu({ chatId, pinned, label }: { chatId: string; pinned: boolean; label: string }) {
  const togglePinChat = useChatStore((s) => s.togglePinChat);

  return (
    <ContextMenuTrigger
      label={label}
      triggerClassName="h-6 w-6 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"
    >
      <DropdownMenuItem onSelect={() => togglePinChat(chatId)}>
        <Star className="h-4 w-4" aria-hidden="true" /> {pinned ? "Unpin" : "Pin"}
      </DropdownMenuItem>
      <DropdownMenuItem><Pencil className="h-4 w-4" aria-hidden="true" /> Rename</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem destructive><Trash2 className="h-4 w-4" aria-hidden="true" /> Delete</DropdownMenuItem>
    </ContextMenuTrigger>
  );
}
