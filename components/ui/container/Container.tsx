import * as React from "react";

import { cn } from "@/lib/utils";

import { containerVariants } from "./container.variants";
import type { ContainerProps } from "./container.types";

/** UzCode AI — Container. Centered, max-width-constrained content wrapper. */
export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size, as: Comp = "div", ...props }, ref) => {
    const Element = Comp as React.ElementType;
    return <Element ref={ref} className={cn(containerVariants({ size }), className)} {...props} />;
  },
);
Container.displayName = "Container";
