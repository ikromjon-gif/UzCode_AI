"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";

import { iconButtonVariants } from "./icon-button.variants";
import type { IconButtonProps } from "./icon-button.types";

/**
 * UzCode AI — IconButton
 * Icon-only action button. `aria-label` is a required prop (not
 * optional) so it's impossible to render an unlabeled icon button.
 */
export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, size, asChild = false, icon, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(iconButtonVariants({ variant, size }), className)}
        {...props}
      >
        {icon}
      </Comp>
    );
  },
);
IconButton.displayName = "IconButton";
