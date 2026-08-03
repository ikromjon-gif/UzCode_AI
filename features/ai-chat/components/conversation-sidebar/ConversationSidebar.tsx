"use client";

import { Plus, Search, PanelLeftClose, PanelLeftOpen } from "lucide-react";

import { cn } from "@/lib/utils";
import { IconButton } from "@/components/ui/icon-button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useUiStore } from "@/store";

import { useChatStore } from "../../store/chat-store";
import { ConversationItem } from "./ConversationItem";

/**
 * UzCode AI — ConversationSidebar
 * Reuses Sprint 4's ui-store for collapse (same `leftPanelCollapsed`
 * WorkspaceLayout already manages) rather than a new boolean — same
 * reasoning as Sprint 5's ExplorerPanel.
 */
export function ConversationSidebar() {
  const collapsed = useUiStore((s) => s.leftPanelCollapsed);
  const chats = useChatStore((s) => s.chats);
  const createChat = useChatStore((s) => s.createChat);

  const pinned = chats.filter((c) => c.pinned);
  const recent = chats.filter((c) => !c.pinned);

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-border p-2">
        {!collapsed && <span className="px-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Chats</span>}
        <IconButton aria-label="New chat" variant="ghost" size="sm" icon={<Plus className="h-4 w-4" />} onClick={createChat} />
      </div>

      {!collapsed && (
        <>
          {/* Search Placeholder — no filtering logic */}
          <div className="flex items-center gap-2 border-b border-border px-3 py-2 text-sm text-muted-foreground">
            <Search className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Search chats…</span>
          </div>

          <ScrollArea className="flex-1">
            <div className="flex flex-col gap-3 p-2">
              {pinned.length > 0 && (
                <div>
                  <p className="mb-1 px-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Pinned</p>
                  <div className="flex flex-col gap-0.5">
                    {pinned.map((chat) => (
                      <ConversationItem key={chat.id} chat={chat} />
                    ))}
                  </div>
                </div>
              )}
              <div>
                <p className="mb-1 px-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Recent</p>
                <div className="flex flex-col gap-0.5">
                  {recent.length === 0 ? (
                    <p className="px-2 text-xs text-muted-foreground">No chats yet.</p>
                  ) : (
                    recent.map((chat) => <ConversationItem key={chat.id} chat={chat} />)
                  )}
                </div>
              </div>
            </div>
          </ScrollArea>
        </>
      )}
    </div>
  );
}
