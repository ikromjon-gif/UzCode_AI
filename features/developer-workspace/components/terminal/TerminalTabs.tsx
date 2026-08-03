"use client";

import * as React from "react";
import { Plus, X, SquareSplitHorizontal } from "lucide-react";

import { cn } from "@/lib/utils";
import { IconButton } from "@/components/ui/icon-button";

import { useDeveloperWorkspaceStore } from "../../store/developer-workspace-store";

/**
 * UzCode AI — TerminalTabs
 * Create/close/select/switch are real (store-backed). Rename is real
 * too — double-click a tab to edit its label inline. Split Terminal
 * is an inert placeholder per spec.
 */
export function TerminalTabs() {
  const terminals = useDeveloperWorkspaceStore((s) => s.terminals);
  const activeId = useDeveloperWorkspaceStore((s) => s.activeTerminalId);
  const setActive = useDeveloperWorkspaceStore((s) => s.setActiveTerminal);
  const createTerminal = useDeveloperWorkspaceStore((s) => s.createTerminal);
  const closeTerminal = useDeveloperWorkspaceStore((s) => s.closeTerminal);
  const renameTerminal = useDeveloperWorkspaceStore((s) => s.renameTerminal);

  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [draftLabel, setDraftLabel] = React.useState("");

  function commitRename(id: string) {
    if (draftLabel.trim()) renameTerminal(id, draftLabel.trim());
    setEditingId(null);
  }

  return (
    <div className="flex h-8 items-center border-b border-border">
      <div role="tablist" aria-label="Terminals" className="flex h-full flex-1 items-center overflow-x-auto">
        {terminals.map((terminal) => {
          const isActive = terminal.id === activeId;
          const isEditing = editingId === terminal.id;

          return (
            <div
              key={terminal.id}
              role="tab"
              aria-selected={isActive}
              tabIndex={0}
              onClick={() => setActive(terminal.id)}
              onDoubleClick={() => {
                setEditingId(terminal.id);
                setDraftLabel(terminal.label);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActive(terminal.id);
                }
              }}
              className={cn(
                "group flex h-full shrink-0 cursor-pointer items-center gap-2 border-r border-border px-3 text-xs transition-colors focus-ring",
                isActive ? "bg-card text-foreground" : "text-muted-foreground hover:bg-muted",
              )}
            >
              {isEditing ? (
                <input
                  autoFocus
                  value={draftLabel}
                  onChange={(e) => setDraftLabel(e.target.value)}
                  onBlur={() => commitRename(terminal.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") commitRename(terminal.id);
                    if (e.key === "Escape") setEditingId(null);
                  }}
                  onClick={(e) => e.stopPropagation()}
                  aria-label="Rename terminal"
                  className="w-20 border-0 bg-transparent p-0 text-xs text-foreground focus:outline-none"
                />
              ) : (
                <span>{terminal.label}</span>
              )}
              <button
                type="button"
                aria-label={`Close ${terminal.label}`}
                onClick={(e) => {
                  e.stopPropagation();
                  closeTerminal(terminal.id);
                }}
                className="flex h-4 w-4 items-center justify-center rounded-[calc(var(--radius-button)/3)] opacity-0 hover:bg-border group-hover:opacity-100"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          );
        })}
      </div>
      <IconButton aria-label="New terminal" variant="ghost" size="sm" className="h-6 w-6 shrink-0" icon={<Plus className="h-3.5 w-3.5" />} onClick={createTerminal} />
      <IconButton aria-label="Split terminal" variant="ghost" size="sm" className="mr-1 h-6 w-6 shrink-0" icon={<SquareSplitHorizontal className="h-3.5 w-3.5" />} />
    </div>
  );
}
