/**
 * UzCode AI — Border Radius Tokens
 * Component-specific radii, sourced directly from the approved
 * Design System diagram (kept per-component rather than collapsed
 * into a generic sm/md/lg scale, since the design intentionally
 * assigns each component type its own radius).
 */
export const radius = {
  button: "12px",
  input: "14px",
  card: "20px",
  modal: "24px",
  avatar: "999px",
} as const;

export type RadiusToken = keyof typeof radius;
