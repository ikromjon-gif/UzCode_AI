import type * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import type { VariantProps } from "class-variance-authority";
import type * as React from "react";

import type { checkboxVariants } from "./checkbox.variants";

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
    VariantProps<typeof checkboxVariants> {}
