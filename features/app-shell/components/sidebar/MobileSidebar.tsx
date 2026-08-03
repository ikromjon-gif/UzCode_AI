"use client";

import * as React from "react";
import { Menu } from "lucide-react";

import { IconButton } from "@/components/ui/icon-button";
import { Sheet, SheetTrigger, SheetContent, SheetTitle } from "@/components/ui/sheet";

import { SidebarNav } from "./SidebarNav";
import type { SidebarProps } from "./sidebar.types";

/**
 * UzCode AI — MobileSidebar
 * Below the md breakpoint, navigation moves into a Sheet triggered
 * from a hamburger icon in TopNav, rather than squeezing the
 * persistent rail. Always renders expanded (collapsed rail state
 * doesn't apply once it's a full-width overlay).
 */
export function MobileSidebar({ items }: SidebarProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <IconButton aria-label="Open navigation menu" variant="ghost" size="md" icon={<Menu className="h-5 w-5" />} className="md:hidden" />
      </SheetTrigger>
      <SheetContent side="left" className="flex w-72 flex-col p-0">
        <SheetTitle className="sr-only">Navigation menu</SheetTitle>
        <SidebarNav items={items} collapsed={false} />
      </SheetContent>
    </Sheet>
  );
}
