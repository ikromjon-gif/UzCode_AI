import * as React from "react";

import { cn } from "@/lib/utils";

import { stackVariants } from "./stack.variants";
import type { StackProps } from "./stack.types";

/** UzCode AI — Stack. Flexbox layout primitive for 1-dimensional arrangement. */
export const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  ({ className, direction, gap, align, justify, wrap, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(stackVariants({ direction, gap, align, justify, wrap }), className)}
      {...props}
    />
  ),
);
Stack.displayName = "Stack";
