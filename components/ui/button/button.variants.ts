import { cva } from "class-variance-authority";

import { buttonBase } from "./button.styles";

/**
 * UzCode AI — Button variants.
 * Every color reference is a semantic token (bg-primary, not a hex).
 */
export const buttonVariants = cva(buttonBase, {
  variants: {
    variant: {
      primary: "bg-primary text-primary-foreground hover:opacity-[var(--opacity-hover)]",
      secondary: "bg-secondary text-secondary-foreground hover:opacity-[var(--opacity-hover)]",
      ghost: "bg-transparent text-foreground hover:bg-muted",
      outline: "border border-border bg-transparent text-foreground hover:bg-muted",
      danger: "bg-destructive text-destructive-foreground hover:opacity-[var(--opacity-hover)]",
    },
    size: {
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-4 text-sm",
      lg: "h-12 px-6 text-base",
      icon: "h-10 w-10 p-0",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});
