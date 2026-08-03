import type * as ToastPrimitive from "@radix-ui/react-toast";
import type { VariantProps } from "class-variance-authority";
import type * as React from "react";

import type { toastVariants } from "./toast.variants";

export interface ToastProps
  extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root>,
    VariantProps<typeof toastVariants> {}

export type ToastActionProps = React.ComponentPropsWithoutRef<typeof ToastPrimitive.Action>;
