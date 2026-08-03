import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

import { spinnerVariants } from "./spinner.variants";
import type { SpinnerProps } from "./spinner.types";

/** UzCode AI — Spinner. Indeterminate loading indicator with a screen-reader announcement. */
export function Spinner({ className, size, label = "Loading", ...props }: SpinnerProps) {
  return (
    <div role="status" className={cn("inline-flex", className)} {...props}>
      <Loader2 className={spinnerVariants({ size })} aria-hidden="true" />
      <span className="sr-only">{label}</span>
    </div>
  );
}
