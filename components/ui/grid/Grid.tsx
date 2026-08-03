import * as React from "react";

import { cn } from "@/lib/utils";

import { gridVariants } from "./grid.variants";
import type { GridProps } from "./grid.types";

/**
 * UzCode AI — Grid. Responsive CSS grid primitive.
 * Column counts collapse gracefully at the sm/lg breakpoints from
 * lib/design-tokens/breakpoints.ts rather than exposing a raw 12-col
 * grid everywhere (12 is available for cases that need it explicitly).
 */
export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ className, cols, gap, ...props }, ref) => (
    <div ref={ref} className={cn(gridVariants({ cols, gap }), className)} {...props} />
  ),
);
Grid.displayName = "Grid";
