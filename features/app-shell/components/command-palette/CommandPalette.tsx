"use client";

import * as React from "react";
import { Search, FolderKanban, MessageSquare, Rocket, Settings } from "lucide-react";

import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useUiStore } from "@/store";

/**
 * UzCode AI — CommandPalette (layout only)
 * Dialog + static item list + the ⌘K keyboard shortcut. No search
 * or filter logic — the input doesn't do anything yet, and the list
 * below is fixed placeholder content, not real commands.
 */
const staticItems = [
  { label: "Go to Projects", icon: FolderKanban },
  { label: "Open AI Chat", icon: MessageSquare },
  { label: "Deploy Project", icon: Rocket },
  { label: "Open Settings", icon: Settings },
];

export function CommandPalette() {
  const open = useUiStore((s) => s.commandPaletteOpen);
  const setOpen = useUiStore((s) => s.setCommandPaletteOpen);

  // Global ⌘K / Ctrl+K shortcut — layout plumbing, not business logic.
  React.useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        setOpen(!open);
      }
      if (event.key === "Escape") {
        setOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, setOpen]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent size="md" hideCloseButton className="top-[20%] translate-y-0 p-0">
        <DialogTitle className="sr-only">Command palette</DialogTitle>
        <DialogDescription className="sr-only">
          Search or run a command across UzCode AI.
        </DialogDescription>
        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
          <Search className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
          <Input
            placeholder="Type a command or search…"
            className="border-0 bg-transparent px-0 focus-visible:outline-none"
            aria-label="Command palette search"
          />
        </div>
        <ul className="max-h-80 overflow-auto p-2" role="listbox" aria-label="Suggested commands">
          {staticItems.map(({ label, icon: Icon }) => (
            <li
              key={label}
              role="option"
              aria-selected={false}
              className="flex cursor-default items-center gap-2 rounded-[calc(var(--radius-input)/2.5)] px-2 py-2 text-sm text-muted-foreground"
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              {label}
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
}
