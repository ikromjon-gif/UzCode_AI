/**
 * UzCode AI — Color Tokens
 *
 * Semantic color tokens for consumers that can't read CSS custom
 * properties (charts, canvas/SVG fills, dynamic inline styles).
 * The CSS-side source of truth lives in app/globals.css (@theme inline);
 * these values must stay in sync with it manually — do not let them drift.
 *
 * Sourced from the approved ARC Design System diagram color panel.
 */
export const colors = {
  light: {
    background: "#FAFAFA",
    card: "#FFFFFF",
    sidebar: "#F8FAFC",
    border: "#E5E7EB",
    textPrimary: "#111827",
    textSecondary: "#687280",
  },
  dark: {
    background: "#0A0A0A",
    card: "#111827",
    sidebar: "#09090B",
    border: "#1F2937",
    textPrimary: "#F3F4F6",
    textSecondary: "#9CA3AF",
  },
  brand: {
    primary: "#00C853",
    secondary: "#22C55E",
    accent: "#3B82F6",
    warning: "#F59E0B",
    error: "#EF4444",
    success: "#22C55E",
  },
} as const;

export type ColorTheme = keyof typeof colors.light;
export type BrandColor = keyof typeof colors.brand;
