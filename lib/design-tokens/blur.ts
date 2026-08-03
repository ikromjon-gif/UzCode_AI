/**
 * UzCode AI — Blur Tokens
 * Backdrop/surface blur values for glass panels, modal overlays,
 * and popovers.
 */
export const blur = {
  panel: "12px",
  overlay: "24px",
} as const;

export type BlurToken = keyof typeof blur;
