"use client";

import * as React from "react";
import { ChevronsUpDown, Search, Bell, Command as CommandIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { IconButton } from "@/components/ui/icon-button";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { useUiStore } from "@/store";

import { MobileSidebar } from "../sidebar/MobileSidebar";
import { primaryNavItems } from "../../constants/nav-items";
import { topNavBase, projectSelectorBase, searchPlaceholderBase } from "./top-nav.styles";
import type { TopNavProps } from "./top-nav.types";

/**
 * UzCode AI — TopNav
 * Every interactive element here is a placeholder per this sprint's
 * scope: Project Selector doesn't switch projects, Search doesn't
 * search, notification bell has no dropdown content, avatar has no
 * account menu. Only the theme toggle and command-palette trigger
 * are functional (both are pure layout/UI state, not business logic).
 */
export function TopNav({ workspaceName = "UzCode AI", projectName, breadcrumb }: TopNavProps) {
  const setCommandPaletteOpen = useUiStore((s) => s.setCommandPaletteOpen);

  return (
    <header className={topNavBase}>
      <MobileSidebar items={primaryNavItems} />

      {/* Project Selector (placeholder — no real project switching yet) */}
      <button type="button" className={projectSelectorBase} aria-haspopup="listbox">
        <span className="truncate">{projectName ?? workspaceName}</span>
        <ChevronsUpDown className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
      </button>

      {breadcrumb}

      <div className="flex-1" />

      {/* Command Bar Placeholder — opens Command Palette, no search logic */}
      <button
        type="button"
        onClick={() => setCommandPaletteOpen(true)}
        className={cn(searchPlaceholderBase)}
      >
        <Search className="h-3.5 w-3.5" aria-hidden="true" />
        <span>Search or run a command…</span>
        <kbd className="ml-4 rounded border border-border bg-card px-1.5 py-0.5 text-[10px] font-medium">
          ⌘K
        </kbd>
      </button>
      <IconButton
        aria-label="Open command palette"
        variant="ghost"
        size="md"
        icon={<CommandIcon className="h-4 w-4" />}
        onClick={() => setCommandPaletteOpen(true)}
        className="sm:hidden"
      />

      {/* Notification Placeholder — trigger only, no dropdown content yet */}
      <IconButton aria-label="Notifications" variant="ghost" size="md" icon={<Bell className="h-4 w-4" />} />

      <ThemeToggle />

      {/* User Avatar Placeholder — no account menu yet */}
      <Avatar size="sm" fallback="U" alt="" />
    </header>
  );
}
