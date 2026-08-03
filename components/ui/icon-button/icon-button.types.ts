import type * as React from "react";
import type { VariantProps } from "class-variance-authority";

import type { iconButtonVariants } from "./icon-button.variants";

export interface IconButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "aria-label">,
    VariantProps<typeof iconButtonVariants> {
  asChild?: boolean;
  icon: React.ReactNode;
  /** Required — an icon-only button has no visible text, so a label is mandatory for screen readers. */
  "aria-label": string;
}
