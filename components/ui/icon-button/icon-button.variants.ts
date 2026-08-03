import { cva } from "class-variance-authority";

import { iconButtonBase } from "./icon-button.styles";

export const iconButtonVariants = cva(iconButtonBase, {
  variants: {
    variant: {
      primary: "bg-primary text-primary-foreground hover:opacity-[var(--opacity-hover)]",
      ghost: "bg-transparent text-foreground hover:bg-muted",
      outline: "border border-border bg-transparent text-foreground hover:bg-muted",
      danger: "bg-destructive text-destructive-foreground hover:opacity-[var(--opacity-hover)]",
    },
    size: {
      sm: "h-8 w-8",
      md: "h-10 w-10",
      lg: "h-12 w-12",
    },
  },
  defaultVariants: {
    variant: "ghost",
    size: "md",
  },
});
