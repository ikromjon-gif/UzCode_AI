import type * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import type { VariantProps } from "class-variance-authority";
import type * as React from "react";

import type { radioGroupVariants } from "./radio-group.variants";

export interface RadioGroupProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>,
    VariantProps<typeof radioGroupVariants> {}

export interface RadioGroupItemProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
  label?: React.ReactNode;
}
