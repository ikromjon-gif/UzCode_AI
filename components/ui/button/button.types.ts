import type * as React from "react";
import type { VariantProps } from "class-variance-authority";

import type { buttonVariants } from "./button.variants";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Render as the child element (e.g. a Next.js Link) instead of a <button>. */
  asChild?: boolean;
  /** Shows a spinner and disables interaction while true. */
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}
