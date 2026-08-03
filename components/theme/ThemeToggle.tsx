"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

import { IconButton } from "@/components/ui/icon-button";

/**
 * UzCode AI — ThemeToggle
 * Lives in components/theme/ (not features/app-shell/) since it's a
 * generic reusable control, not app-shell-specific — TopNav is just
 * its first consumer. Reads/writes via next-themes (Sprint 1/2), no
 * new state of its own.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Avoids a hydration mismatch: resolvedTheme is unknown on the
  // server, so the icon only renders once mounted on the client.
  React.useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  return (
    <IconButton
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      variant="ghost"
      size="md"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      icon={
        mounted ? (
          isDark ? (
            <Sun className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Moon className="h-4 w-4" aria-hidden="true" />
          )
        ) : (
          <span className="h-4 w-4" />
        )
      }
    />
  );
}
