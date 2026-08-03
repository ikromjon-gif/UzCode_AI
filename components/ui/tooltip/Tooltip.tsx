"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { cn } from "@/lib/utils";

import { tooltipContentVariants } from "./tooltip.variants";
import type { TooltipContentProps, SimpleTooltipProps } from "./tooltip.types";

/**
 * UzCode AI — Tooltip
 * Built on Radix Tooltip: shows on both hover AND keyboard focus
 * (critical — a hover-only tooltip is inaccessible to keyboard users).
 */
export const TooltipProvider = TooltipPrimitive.Provider;
export const Tooltip = TooltipPrimitive.Root;
export const TooltipTrigger = TooltipPrimitive.Trigger;

export const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  TooltipContentProps
>(({ className, sideOffset = 6, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(tooltipContentVariants(), className)}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

/** Convenience wrapper for the common case: one trigger, one text tooltip. */
export function SimpleTooltip({ content, children, side = "top" }: SimpleTooltipProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side={side}>{content}</TooltipContent>
    </Tooltip>
  );
}
