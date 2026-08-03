import type * as ProgressPrimitive from "@radix-ui/react-progress";
import type { VariantProps } from "class-variance-authority";
import type * as React from "react";

import type { progressVariants } from "./progress.variants";

export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
    VariantProps<typeof progressVariants> {}
