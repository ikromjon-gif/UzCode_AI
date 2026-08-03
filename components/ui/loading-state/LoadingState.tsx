import * as React from "react";

import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";

import { loadingStateVariants } from "./loading-state.variants";
import { loadingStateLabelBase } from "./loading-state.styles";
import type { LoadingStateProps } from "./loading-state.types";

/**
 * UzCode AI — LoadingState
 * Full-region loading placeholder — composes Spinner rather than
 * reimplementing the spin animation (no duplicated code).
 */
export function LoadingState({ className, label = "Loading…", ...props }: LoadingStateProps) {
  return (
    <div className={cn(loadingStateVariants(), className)} {...props}>
      <Spinner size="lg" label={label} />
      <p className={loadingStateLabelBase}>{label}</p>
    </div>
  );
}
