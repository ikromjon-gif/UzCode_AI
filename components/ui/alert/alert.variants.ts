import { cva } from "class-variance-authority";

import { alertBase } from "./alert.styles";

export const alertVariants = cva(alertBase, {
  variants: {
    variant: {
      default: "border-border bg-card text-foreground",
      success: "border-success/30 bg-success/10 text-success [&>svg]:text-success",
      warning: "border-warning/30 bg-warning/10 text-warning [&>svg]:text-warning",
      destructive: "border-destructive/30 bg-destructive/10 text-destructive [&>svg]:text-destructive",
      accent: "border-accent/30 bg-accent/10 text-accent [&>svg]:text-accent",
    },
  },
  defaultVariants: { variant: "default" },
});
