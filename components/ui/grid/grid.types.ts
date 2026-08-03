import type * as React from "react";
import type { VariantProps } from "class-variance-authority";

import type { gridVariants } from "./grid.variants";

export interface GridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridVariants> {}
