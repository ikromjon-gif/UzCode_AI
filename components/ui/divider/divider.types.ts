import type * as React from "react";
import type { VariantProps } from "class-variance-authority";

import type { dividerVariants } from "./divider.variants";

export interface DividerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dividerVariants> {
  /** Optional label rendered centered in the divider (e.g. "OR"). */
  label?: React.ReactNode;
}
