import { cva } from "class-variance-authority";

import { badgeBase } from "./badge.styles";

export const badgeVariants = cva(badgeBase, {
  variants: {
    variant: {
      default: "border-transparent bg-secondary text-secondary-foreground",
      success: "border-transparent bg-success text-success-foreground",
      warning: "border-transparent bg-warning text-warning-foreground",
      destructive: "border-transparent bg-destructive text-destructive-foreground",
      accent: "border-transparent bg-accent text-accent-foreground",
      outline: "border-border bg-transparent text-foreground",
    },
  },
  defaultVariants: { variant: "default" },
});
