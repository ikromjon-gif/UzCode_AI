"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { navItemBase, navItemActive } from "./sidebar.styles";
import type { SidebarNavItemProps } from "./sidebar.types";

/**
 * UzCode AI — SidebarNavItem
 * Leaf items render as a Link. Items with `children` render as a
 * disclosure button (keyboard-operable, aria-expanded) revealing a
 * nested list — expand/collapse is local UI state, not global store
 * state, since it's scoped to a single item.
 */
export function SidebarNavItem({ item, collapsed, activePath }: SidebarNavItemProps) {
  const [expanded, setExpanded] = React.useState(false);
  const Icon = item.icon;
  const isActive = activePath === item.href;
  const hasChildren = Boolean(item.children?.length);

  if (hasChildren) {
    return (
      <div>
        <button
          type="button"
          aria-expanded={expanded}
          onClick={() => setExpanded((v) => !v)}
          className={cn(navItemBase, "w-full justify-between", isActive && navItemActive)}
        >
          <span className="flex items-center gap-3">
            <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
            {!collapsed && <span className="truncate">{item.label}</span>}
          </span>
          {!collapsed && (
            <ChevronRight
              className={cn("h-3.5 w-3.5 shrink-0 transition-transform duration-[var(--duration-fast)]", expanded && "rotate-90")}
              aria-hidden="true"
            />
          )}
        </button>
        {!collapsed && expanded && (
          <div className="ml-4 mt-1 flex flex-col gap-1 border-l border-border pl-3">
            {item.children!.map((child) => (
              <SidebarNavItem key={child.label} item={child} collapsed={false} activePath={activePath} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={item.href}
      aria-current={isActive ? "page" : undefined}
      className={cn(navItemBase, isActive && navItemActive)}
      title={collapsed ? item.label : undefined}
    >
      <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
      {!collapsed && <span className="truncate">{item.label}</span>}
    </Link>
  );
}
