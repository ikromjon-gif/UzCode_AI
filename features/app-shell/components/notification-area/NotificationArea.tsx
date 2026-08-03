"use client";

import type * as React from "react";

import { ToastProvider, ToastViewport } from "@/components/ui/toast";

/**
 * UzCode AI — NotificationArea
 * Distinct from TopNav's notification *bell* (a trigger icon with no
 * dropdown yet): this is the actual mount point for toast
 * notifications app-wide, wired to Sprint 3's Toast primitives. No
 * toast is ever triggered yet — there's no imperative toast() API
 * built (that's application logic, deferred). This just makes sure
 * the mount point exists so a later sprint can start dispatching
 * toasts without touching the shell again.
 */
export function NotificationArea({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      {children}
      <ToastViewport />
    </ToastProvider>
  );
}
