import type * as SwitchPrimitive from "@radix-ui/react-switch";
import type { VariantProps } from "class-variance-authority";
import type * as React from "react";

import type { switchVariants } from "./switch.variants";

export interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>,
    VariantProps<typeof switchVariants> {}
