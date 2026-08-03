import type * as React from "react";
import type { VariantProps } from "class-variance-authority";

import type { stackVariants } from "./stack.variants";

export interface StackProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stackVariants> {}
