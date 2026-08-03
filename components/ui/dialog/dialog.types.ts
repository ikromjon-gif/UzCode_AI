import type * as DialogPrimitive from "@radix-ui/react-dialog";
import type { VariantProps } from "class-variance-authority";
import type * as React from "react";

import type { dialogContentVariants } from "./dialog.variants";

export type DialogProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Root>;

export interface DialogContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    VariantProps<typeof dialogContentVariants> {
  /** Hides the built-in top-right close button (e.g. when Sheet/Drawer provides its own). */
  hideCloseButton?: boolean;
}
