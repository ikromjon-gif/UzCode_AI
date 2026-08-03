/**
 * UzCode AI — Theme Configuration
 * Theme metadata extracted out of ThemeProvider.tsx so the provider
 * component itself stays purely presentational, per the Constitution's
 * component rules (config data doesn't belong inline in JSX files).
 */
export const themeConfig = {
  themes: ["light", "dark"] as const,
  defaultTheme: "system",
  storageKey: "uzcode-ai-theme",
} as const;

export type Theme = (typeof themeConfig.themes)[number];
