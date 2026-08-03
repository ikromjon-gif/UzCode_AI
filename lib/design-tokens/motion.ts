/**
 * UzCode AI — Motion Primitives
 *
 * Raw duration/easing values only. Deliberately has NO dependency on
 * framer-motion (installation is delayed to Sprint 3) — these are
 * plain numbers/strings usable by CSS transitions today, and will
 * back real <motion.div> variants once framer-motion is installed.
 *
 * Durations match the Constitution's explicit animation rule
 * (150ms / 200ms / 300ms). Easing follows the "natural, not
 * distracting" principle: ease-out for entrances, ease-in for exits.
 */
export const duration = {
  fast: 150,
  base: 200,
  slow: 300,
} as const;

export type DurationToken = keyof typeof duration;

export const easing = {
  out: [0, 0, 0.2, 1] as const, // entrances
  in: [0.4, 0, 1, 1] as const, // exits
  inOut: [0.4, 0, 0.2, 1] as const, // state changes
} as const;

export type EasingToken = keyof typeof easing;

/**
 * Named motion variant shapes. Framework-agnostic (plain objects) so
 * they can be consumed by CSS-in-JS, Tailwind arbitrary values, or
 * framer-motion `variants` props once the library is installed in
 * Sprint 3 without changing this file's shape.
 */
export const motionVariants = {
  fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
  slideUp: { from: { opacity: 0, y: 8 }, to: { opacity: 1, y: 0 } },
  scaleIn: { from: { opacity: 0, scale: 0.96 }, to: { opacity: 1, scale: 1 } },
  hoverLift: { from: { y: 0 }, to: { y: -2 } },
} as const;

export type MotionVariantToken = keyof typeof motionVariants;
