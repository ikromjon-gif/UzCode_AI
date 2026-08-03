"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

import { buttonVariants } from "./button.variants";
import { buttonSpinnerSize } from "./button.styles";
import type { ButtonProps } from "./button.types";

/**
 * UzCode AI — Button
 * Primary interactive action component. Supports `asChild` composition,
 * a loading state, and optional leading/trailing icons.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    const spinnerSize = buttonSpinnerSize[size ?? "md"];

    // Radix Slot requires exactly one child to clone props onto, so icon/
    // spinner injection only applies to the default <button> render path.
    // When composing via asChild, the caller's single child renders as-is.
    if (asChild) {
      return (
        <Comp
          ref={ref}
          className={cn(buttonVariants({ variant, size }), className)}
          {...props}
        >
          {children}
        </Comp>
      );
    }

    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={disabled || isLoading}
        aria-busy={isLoading || undefined}
        {...props}
      >
        {isLoading ? (
          <Loader2 size={spinnerSize} className="animate-spin" aria-hidden="true" />
        ) : (
          leftIcon
        )}
        {children}
        {!isLoading && rightIcon}
      </Comp>
    );
  },
);
Button.displayName = "Button";
