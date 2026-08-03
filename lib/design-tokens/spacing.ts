/**
 * UzCode AI — Spacing Tokens
 * 4px base unit. Contains every checkpoint shown on the approved
 * 8pt-grid diagram (8/16/24/48) while allowing finer control
 * (4/12/20) where an 8pt-only grid would be too coarse.
 */
export const spacing = {
  0: "0px",
  1: "4px",
  2: "8px",
  3: "12px",
  4: "16px",
  5: "20px",
  6: "24px",
  8: "32px",
  10: "40px",
  12: "48px",
  16: "64px",
  20: "80px",
  24: "96px",
} as const;

export type SpacingToken = keyof typeof spacing;
