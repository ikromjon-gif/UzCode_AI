import type * as SelectPrimitive from "@radix-ui/react-select";
import type { VariantProps } from "class-variance-authority";
import type * as React from "react";

import type { selectTriggerVariants } from "./select.variants";

export interface SelectTriggerProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>,
    VariantProps<typeof selectTriggerVariants> {}

export type SelectRootProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root>;
export type SelectItemProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>;
