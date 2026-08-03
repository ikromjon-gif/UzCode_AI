import { cn } from "@/lib/utils";

import { badgeVariants } from "./badge.variants";
import type { BadgeProps } from "./badge.types";

/** UzCode AI — Badge. Static status/label pill. Not interactive, no ref needed. */
export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
