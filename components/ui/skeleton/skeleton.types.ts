import type * as React from "react";
import type { VariantProps } from "class-variance-authority";

import type { skeletonVariants } from "./skeleton.variants";

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {}
