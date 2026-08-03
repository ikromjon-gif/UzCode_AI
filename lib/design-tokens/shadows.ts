/**
 * UzCode AI — Shadow / Elevation Tokens
 * card, hover, and modal are sourced directly from the approved
 * Design System diagram. `resting` is an interpolated addition
 * (not shown in the diagram) for low-elevation surfaces like
 * dropdowns and tooltips that sit between "flat" and "card".
 */
export const shadows = {
  resting: "0 2px 8px rgba(0, 0, 0, 0.06)",
  card: "0 4px 20px rgba(0, 0, 0, 0.05)",
  hover: "0 8px 30px rgba(0, 0, 0, 0.15)",
  modal: "0 20px 60px rgba(0, 0, 0, 0.18)",
} as const;

export type ShadowToken = keyof typeof shadows;
