"use client";

import { Sidebar } from "../sidebar";
import { TopNav } from "../top-nav";
import { AppBreadcrumb } from "../breadcrumb";
import { StatusBar } from "../status-bar";
import { CommandPalette } from "../command-palette";
import { NotificationArea } from "../notification-area";
import { Footer } from "../footer";
import { primaryNavItems } from "../../constants/nav-items";
import type { AppShellProps } from "./app-shell.types";

/**
 * UzCode AI — AppShell
 * Composes the full shell tree per the approved Sprint 4 diagram:
 * Sidebar / TopNav (with Breadcrumb) / main content slot / StatusBar
 * / Footer, plus the CommandPalette and NotificationArea mount
 * points. This is the single component app/(app)/layout.tsx renders.
 */
export function AppShell({ children, breadcrumb = [], workspaceName, projectName }: AppShellProps) {
  return (
    <NotificationArea>
      <div className="flex h-dvh w-full overflow-hidden">
        <Sidebar items={primaryNavItems} />

        <div className="flex min-w-0 flex-1 flex-col">
          <TopNav
            workspaceName={workspaceName}
            projectName={projectName}
            breadcrumb={<AppBreadcrumb items={breadcrumb} />}
          />

          {/* Main Content Slot */}
          <main className="min-h-0 flex-1 overflow-hidden">{children}</main>

          <StatusBar workspaceName={workspaceName} />
          <Footer />
        </div>
      </div>

      <CommandPalette />
    </NotificationArea>
  );
}
