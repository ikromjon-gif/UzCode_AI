"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

import { switchVariants, switchThumbVariants } from "./switch.variants";
import type { SwitchProps } from "./switch.types";

/** UzCode AI — Switch. Built on Radix Switch (role="switch", correct keyboard toggle). */
export const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  SwitchProps
>(({ className, size, ...props }, ref) => (
  <SwitchPrimitive.Root
    ref={ref}
    className={cn(switchVariants({ size }), className)}
    {...props}
  >
    <SwitchPrimitive.Thumb className={cn(switchThumbVariants({ size }))} />
  </SwitchPrimitive.Root>
));
Switch.displayName = SwitchPrimitive.Root.displayName;
