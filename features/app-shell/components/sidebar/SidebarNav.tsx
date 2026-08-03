"use client";

import { usePathname } from "next/navigation";

import { ScrollArea } from "@/components/ui/scroll-area";

import { SidebarNavItem } from "./SidebarNavItem";
import type { SidebarProps } from "./sidebar.types";

/** Shared nav list — used by both the desktop rail and the mobile Sheet. */
export function SidebarNav({ items, collapsed = false }: SidebarProps & { collapsed?: boolean }) {
  const pathname = usePathname();

  return (
    <ScrollArea className="flex-1">
      <nav aria-label="Primary" className="flex flex-col gap-1 p-3">
        {items.map((item) => (
          <SidebarNavItem key={item.label} item={item} collapsed={collapsed} activePath={pathname} />
        ))}
      </nav>
    </ScrollArea>
  );
}
