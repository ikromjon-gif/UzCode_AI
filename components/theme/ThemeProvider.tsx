"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

import { themeConfig } from "./theme-config";

/**
 * UzCode AI — Theme Provider
 * Wraps next-themes to support Dark Mode / Light Mode as required by
 * the Constitution's Design System rules. Explicitly passes the theme
 * list and storage key from theme-config.ts rather than relying on
 * next-themes' defaults, so only "light" and "dark" classes are ever
 * applied to <html> — the CSS .dark selector in globals.css never has
 * to account for a third variant.
 *
 * UI toggle components are built in Sprint 3 (UI Components); this
 * only provides the infrastructure.
 */
export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"
      themes={[...themeConfig.themes]}
      defaultTheme={themeConfig.defaultTheme}
      storageKey={themeConfig.storageKey}
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
