import { cva } from "class-variance-authority";

import { toastBase } from "./toast.styles";

export const toastVariants = cva(toastBase, {
  variants: {
    variant: {
      default: "border-border bg-card text-foreground",
      success: "border-success/30 bg-card text-foreground [&_svg]:text-success",
      destructive: "border-destructive/30 bg-card text-foreground [&_svg]:text-destructive",
    },
  },
  defaultVariants: { variant: "default" },
});
