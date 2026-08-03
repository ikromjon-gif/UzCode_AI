import { cva } from "class-variance-authority";

import { containerBase } from "./container.styles";

export const containerVariants = cva(containerBase, {
  variants: {
    size: {
      sm: "max-w-screen-sm",
      md: "max-w-screen-md",
      lg: "max-w-screen-lg",
      xl: "max-w-screen-xl",
      full: "max-w-none",
    },
  },
  defaultVariants: { size: "xl" },
});
