/**
 * UzCode AI — Container Tokens
 * Max-widths paired 1:1 with the breakpoint scale, mirroring the
 * `container` utility declared in app/globals.css. Kept here as a
 * typed JS mirror for any layout math that can't be done in pure CSS.
 */
import { breakpoints } from "./breakpoints";

export const container = {
  padding: "2rem",
  maxWidth: {
    sm: `${breakpoints.sm}px`,
    md: `${breakpoints.md}px`,
    lg: `${breakpoints.lg}px`,
    xl: `${breakpoints.xl}px`,
    "2xl": "1400px", // capped narrower than the 2xl breakpoint itself, matches prior container config
  },
} as const;
