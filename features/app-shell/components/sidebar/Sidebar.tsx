"use client";

import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

import { cn } from "@/lib/utils";
import { IconButton } from "@/components/ui/icon-button";
import { useUiStore } from "@/store";

import { SidebarNav } from "./SidebarNav";
import { sidebarBase, sidebarWidthExpanded, sidebarWidthCollapsed } from "./sidebar.styles";
import type { SidebarProps } from "./sidebar.types";

/**
 * UzCode AI — Sidebar (desktop/tablet persistent rail)
 * Hidden below the md breakpoint — MobileSidebar (Sheet-based)
 * covers small screens instead of squeezing this rail down further.
 * Collapse state lives in the shared Zustand ui-store so TopNav's
 * toggle (if added later) and this rail always agree.
 */
export function Sidebar({ items }: SidebarProps) {
  const collapsed = useUiStore((s) => s.sidebarCollapsed);
  const toggleSidebar = useUiStore((s) => s.toggleSidebar);

  return (
    <aside
      className={cn(sidebarBase, collapsed ? sidebarWidthCollapsed : sidebarWidthExpanded, "hidden md:flex")}
    >
      <SidebarNav items={items} collapsed={collapsed} />
      <div className="border-t border-border p-3">
        <IconButton
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          variant="ghost"
          size="sm"
          icon={collapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
          onClick={toggleSidebar}
          className="w-full"
        />
      </div>
    </aside>
  );
}
