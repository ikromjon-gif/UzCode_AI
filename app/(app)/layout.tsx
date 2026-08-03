import type * as React from "react";

import { AppShell } from "@/features/app-shell";

/**
 * UzCode AI — (app) route group layout
 * Shared by every authenticated-app route (Workspace, Projects,
 * AI Chat, Deploy, Settings). The parentheses mean "(app)" doesn't
 * appear in the URL — /workspace, not /(app)/workspace.
 *
 * No auth check here yet (Sprint 6 — Authentication). This sprint
 * only wires the shell, not access control.
 */
export default function AppRouteGroupLayout({ children }: { children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
