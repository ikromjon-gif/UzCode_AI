/**
 * UzCode AI — Button shared style fragments.
 * Non-variant classes reused by both button.variants.ts and Button.tsx.
 */
export const buttonBase =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-button font-medium " +
  "transition-colors duration-[var(--duration-fast)] ease-[var(--ease-out)] focus-ring " +
  "disabled:pointer-events-none disabled:opacity-[var(--opacity-disabled)]";

/** Spinner size in px, keyed by button size — keeps the loading icon proportional. */
export const buttonSpinnerSize: Record<"sm" | "md" | "lg" | "icon", number> = {
  sm: 14,
  md: 16,
  lg: 18,
  icon: 16,
};
