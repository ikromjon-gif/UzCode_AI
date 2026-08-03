import { cn } from "@/lib/utils";

import { dividerVariants } from "./divider.variants";
import { dividerLineBase, dividerLabelBase } from "./divider.styles";
import type { DividerProps } from "./divider.types";

/**
 * UzCode AI — Divider
 * Distinct from Separator: Separator is a plain semantic rule
 * (Radix `role="separator"`); Divider supports an optional centered
 * label (e.g. "OR" between two auth options) — a different, additive
 * use case rather than a duplicate of Separator's responsibility.
 */
export function Divider({ className, spacing, label, ...props }: DividerProps) {
  return (
    <div role="separator" className={cn(dividerVariants({ spacing }), className)} {...props}>
      <span className={dividerLineBase} />
      {label ? <span className={dividerLabelBase}>{label}</span> : null}
      <span className={dividerLineBase} />
    </div>
  );
}
