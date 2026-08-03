import type * as TooltipPrimitive from "@radix-ui/react-tooltip";
import type * as React from "react";

export type TooltipProviderProps = React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Provider>;
export type TooltipContentProps = React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>;

export interface SimpleTooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
}
