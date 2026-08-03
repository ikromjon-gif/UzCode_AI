import type * as React from "react";
import type { VariantProps } from "class-variance-authority";

import type { spinnerVariants } from "./spinner.variants";

export interface SpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spinnerVariants> {
  /** Accessible label announced to screen readers (default: "Loading"). */
  label?: string;
}
