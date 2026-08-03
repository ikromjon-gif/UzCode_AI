/**
 * UzCode AI — Opacity Tokens
 * Named opacities for common interaction/state use-cases, so
 * "disabled" or "overlay" opacity is defined once and referenced
 * by name rather than re-guessed per component.
 */
export const opacity = {
  disabled: 0.5,
  hover: 0.8,
  overlay: 0.6,
  subtle: 0.05,
} as const;

export type OpacityToken = keyof typeof opacity;
