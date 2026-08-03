import * as React from "react";

import { cn } from "@/lib/utils";

import { inputVariants } from "./input.variants";
import type { InputProps } from "./input.types";

/**
 * UzCode AI — Input
 * Standard text input. `invalid` drives both the visual error state
 * and should be paired with `aria-invalid` + `aria-describedby` by
 * the consumer (e.g. a form field wrapper built in a later sprint).
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, size, invalid, ...props }, ref) => {
    return (
      <input
        ref={ref}
        aria-invalid={invalid || undefined}
        className={cn(inputVariants({ size, invalid }), className)}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";
