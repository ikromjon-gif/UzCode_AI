import { colors } from "@/lib/design-tokens";

/**
 * UzCode AI — xterm.js configuration (PREPARED, NOT USED YET)
 *
 * This mirrors Sprint 6's monaco-theme.ts pattern: colors are pulled
 * from lib/design-tokens/colors.ts rather than hardcoded, ready to be
 * passed to `new Terminal({ theme: ... })` in a future sprint.
 *
 * IMPORTANT: no file in this codebase imports "@xterm/xterm" yet.
 * This object is exported for architecture-readiness only — actually
 * constructing a Terminal instance and calling .open()/.write() is
 * explicitly out of scope this sprint.
 */
export function getXtermTheme(mode: "light" | "dark") {
  const palette = mode === "dark" ? colors.dark : colors.light;
  return {
    background: palette.card,
    foreground: palette.textPrimary,
    cursor: colors.brand.primary,
    selectionBackground: `${colors.brand.accent}33`,
    black: palette.textPrimary,
    brightBlack: palette.textSecondary,
    red: colors.brand.error,
    green: colors.brand.success,
    yellow: colors.brand.warning,
    blue: colors.brand.accent,
    magenta: colors.brand.accent,
    cyan: colors.brand.secondary,
    white: palette.textPrimary,
  };
}

export const xtermOptions = {
  fontFamily: "var(--font-jetbrains-mono), monospace",
  fontSize: 13,
  cursorBlink: true,
  cursorStyle: "bar" as const,
  scrollback: 5000,
  convertEol: true,
};
