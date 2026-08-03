import type { Monaco } from "@monaco-editor/react";

import { colors } from "@/lib/design-tokens";

/**
 * UzCode AI — Monaco theme definitions.
 * Monaco's defineTheme API requires literal hex colors — it cannot
 * read CSS custom properties. Rather than inventing new hex values,
 * every color below is pulled from lib/design-tokens/colors.ts
 * (Sprint 2's established source of truth for exactly this data),
 * so "never hardcode colors" holds in spirit even though Monaco's
 * own API can't consume our CSS variables directly.
 */
export const UZCODE_LIGHT_THEME = "uzcode-light";
export const UZCODE_DARK_THEME = "uzcode-dark";

export function defineUzCodeThemes(monaco: Monaco) {
  monaco.editor.defineTheme(UZCODE_LIGHT_THEME, {
    base: "vs",
    inherit: true,
    rules: [
      { token: "comment", foreground: colors.light.textSecondary.replace("#", "") },
      { token: "string", foreground: colors.brand.secondary.replace("#", "") },
      { token: "keyword", foreground: colors.brand.accent.replace("#", "") },
      { token: "number", foreground: colors.brand.warning.replace("#", "") },
      { token: "delimiter", foreground: colors.light.textSecondary.replace("#", "") },
    ],
    colors: {
      "editor.background": colors.light.card,
      "editor.foreground": colors.light.textPrimary,
      "editorLineNumber.foreground": colors.light.textSecondary,
      "editorLineNumber.activeForeground": colors.light.textPrimary,
      "editorCursor.foreground": colors.brand.primary,
      "editor.lineHighlightBackground": colors.light.sidebar,
      "editorIndentGuide.background": colors.light.border,
      "editorWhitespace.foreground": colors.light.border,
      "editor.selectionBackground": `${colors.brand.accent}33`,
    },
  });

  monaco.editor.defineTheme(UZCODE_DARK_THEME, {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "comment", foreground: colors.dark.textSecondary.replace("#", "") },
      { token: "string", foreground: colors.brand.secondary.replace("#", "") },
      { token: "keyword", foreground: colors.brand.accent.replace("#", "") },
      { token: "number", foreground: colors.brand.warning.replace("#", "") },
      { token: "delimiter", foreground: colors.dark.textSecondary.replace("#", "") },
    ],
    colors: {
      "editor.background": colors.dark.card,
      "editor.foreground": colors.dark.textPrimary,
      "editorLineNumber.foreground": colors.dark.textSecondary,
      "editorLineNumber.activeForeground": colors.dark.textPrimary,
      "editorCursor.foreground": colors.brand.primary,
      "editor.lineHighlightBackground": colors.dark.sidebar,
      "editorIndentGuide.background": colors.dark.border,
      "editorWhitespace.foreground": colors.dark.border,
      "editor.selectionBackground": `${colors.brand.accent}33`,
    },
  });
}
