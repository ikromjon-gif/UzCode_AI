import * as React from "react";

import { cn } from "@/lib/utils";

import { skeletonVariants } from "./skeleton.variants";
import type { SkeletonProps } from "./skeleton.types";

/**
 * UzCode AI — Skeleton
 * Pure-CSS loading placeholder (no Framer Motion dependency).
 * `aria-hidden` since it conveys no information to screen readers —
 * pair it with a visually-hidden "Loading…" announcement at the call site.
 */
export function Skeleton({ className, radius, ...props }: SkeletonProps) {
  return <div aria-hidden="true" className={cn(skeletonVariants({ radius }), className)} {...props} />;
}
