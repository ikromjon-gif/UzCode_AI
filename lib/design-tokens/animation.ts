/**
 * UzCode AI — Semantic Animation Tokens
 *
 * Composes the raw primitives in motion.ts into named,
 * use-case-specific assignments, so components reference *intent*
 * ("button hover", "modal enter") rather than raw duration/easing
 * pairs. This is the layer components should import from — motion.ts
 * stays the low-level primitive source only.
 */
import { duration, easing } from "./motion";

export const animationTokens = {
  buttonHover: { duration: duration.fast, easing: easing.out },
  buttonPress: { duration: duration.fast, easing: easing.inOut },
  dropdownOpen: { duration: duration.fast, easing: easing.out },
  tooltipShow: { duration: duration.fast, easing: easing.out },
  modalEnter: { duration: duration.base, easing: easing.out },
  modalExit: { duration: duration.fast, easing: easing.in },
  pageTransition: { duration: duration.slow, easing: easing.inOut },
} as const;

export type AnimationToken = keyof typeof animationTokens;
