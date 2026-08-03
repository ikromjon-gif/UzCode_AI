import type * as React from "react";
import type { VariantProps } from "class-variance-authority";

import type { badgeVariants } from "./badge.variants";

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}
