/**
 * UzCode AI — Breakpoint Tokens
 * Matches MASTER_PROMPT.md's approved responsive breakpoints exactly,
 * and matches Tailwind v4's own defaults (no CSS override needed —
 * this file exists purely for JS consumers, e.g. a future
 * useMediaQuery hook or conditional render logic outside Tailwind).
 */
export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

export type BreakpointToken = keyof typeof breakpoints;
