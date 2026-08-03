"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";

import { cn } from "@/lib/utils";

import { radioGroupVariants, radioItemVariants } from "./radio-group.variants";
import type { RadioGroupProps, RadioGroupItemProps } from "./radio-group.types";

/** UzCode AI — RadioGroup. Built on Radix RadioGroup for roving-tabindex keyboard nav. */
export const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(({ className, orientation, ...props }, ref) => (
  <RadioGroupPrimitive.Root
    ref={ref}
    className={cn(radioGroupVariants({ orientation }), className)}
    {...props}
  />
));
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

export const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>(({ className, label, id, ...props }, ref) => (
  <div className="flex items-center gap-2">
    <RadioGroupPrimitive.Item
      ref={ref}
      id={id}
      className={cn(radioItemVariants(), className)}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex h-full w-full items-center justify-center">
        <Circle className="h-2.5 w-2.5 fill-primary text-primary" aria-hidden="true" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
    {label ? (
      <label htmlFor={id} className="text-sm text-foreground">
        {label}
      </label>
    ) : null}
  </div>
));
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;
