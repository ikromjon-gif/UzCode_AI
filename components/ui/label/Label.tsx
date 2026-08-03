"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";

import { cn } from "@/lib/utils";

import { labelVariants } from "./label.variants";
import type { LabelProps } from "./label.types";

/**
 * UzCode AI — Label
 * Wraps Radix Label so `htmlFor` correctly associates with, and
 * clicking the label correctly focuses, its paired form control.
 */
export const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  LabelProps
>(({ className, required, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants({ required }), className)}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;
