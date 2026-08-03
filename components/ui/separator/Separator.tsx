"use client";

import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cn } from "@/lib/utils";

import { separatorVariants } from "./separator.variants";
import type { SeparatorProps } from "./separator.types";

/** UzCode AI — Separator. Decorative by default (aria-hidden via Radix unless `decorative={false}`). */
export const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  SeparatorProps
>(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => (
  <SeparatorPrimitive.Root
    ref={ref}
    orientation={orientation}
    decorative={decorative}
    className={cn(separatorVariants({ orientation }), className)}
    {...props}
  />
));
Separator.displayName = SeparatorPrimitive.Root.displayName;
