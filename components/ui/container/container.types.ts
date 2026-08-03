import type * as React from "react";
import type { VariantProps } from "class-variance-authority";

import type { containerVariants } from "./container.variants";

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  as?: keyof React.JSX.IntrinsicElements;
}
