import type * as React from "react";
import type * as LabelPrimitive from "@radix-ui/react-label";
import type { VariantProps } from "class-variance-authority";

import type { labelVariants } from "./label.variants";

export interface LabelProps
  extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>,
    VariantProps<typeof labelVariants> {}
