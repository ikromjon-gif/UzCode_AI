"use client";

import * as React from "react";
import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

import type { NavSectionProps } from "./workspace-nav.types";

/** Collapsible section — local UI state, scoped to a single disclosure. */
export function NavSection({ title, children, defaultOpen = false }: NavSectionProps) {
  const [open, setOpen] = React.useState(defaultOpen);

  return (
    <div className="border-b border-border">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-1.5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground transition-colors hover:text-foreground focus-ring"
      >
        <ChevronRight
          className={cn("h-3 w-3 transition-transform duration-[var(--duration-fast)]", open && "rotate-90")}
          aria-hidden="true"
        />
        {title}
      </button>
      {open ? <div className="pb-2">{children}</div> : null}
    </div>
  );
}
