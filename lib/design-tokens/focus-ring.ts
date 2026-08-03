/**
 * UzCode AI — Focus Ring Tokens
 * Every interactive element must expose a visible focus state per
 * the Constitution's accessibility rules. These tokens back the
 * shared `.focus-ring` utility declared in app/globals.css so focus
 * styling is consistent instead of redefined per component.
 */
export const focusRing = {
  width: "2px",
  offset: "2px",
  color: "var(--color-ring)",
} as const;
