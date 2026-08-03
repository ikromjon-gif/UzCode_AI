"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

import { progressVariants } from "./progress.variants";
import { progressIndicatorBase } from "./progress.styles";
import type { ProgressProps } from "./progress.types";

/** UzCode AI — Progress. Determinate progress bar (role="progressbar" via Radix). */
export const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, size, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    value={value}
    className={cn(progressVariants({ size }), className)}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={progressIndicatorBase}
      style={{ transform: `translateX(-${100 - (value ?? 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;
