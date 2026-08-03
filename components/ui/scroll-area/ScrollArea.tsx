"use client";

import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";

import { cn } from "@/lib/utils";

import { scrollBarVariants } from "./scroll-area.variants";
import { scrollAreaBase, scrollThumbBase } from "./scroll-area.styles";
import type { ScrollAreaProps } from "./scroll-area.types";

/**
 * UzCode AI — ScrollArea
 * Built on Radix ScrollArea for cross-browser-consistent custom
 * scrollbars that stay keyboard/wheel scrollable (unlike a pure-CSS
 * `overflow` + hidden-native-scrollbar hack).
 */
export const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  ScrollAreaProps
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root ref={ref} className={cn(scrollAreaBase, className)} {...props}>
    <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollAreaPrimitive.Scrollbar
      orientation="vertical"
      className={scrollBarVariants({ orientation: "vertical" })}
    >
      <ScrollAreaPrimitive.Thumb className={scrollThumbBase} />
    </ScrollAreaPrimitive.Scrollbar>
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
));
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;
