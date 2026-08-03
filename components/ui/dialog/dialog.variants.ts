import { cva } from "class-variance-authority";

import { dialogContentBase } from "./dialog.styles";

export const dialogContentVariants = cva(dialogContentBase, {
  variants: {
    size: {
      sm: "max-w-sm",
      md: "max-w-lg",
      lg: "max-w-2xl",
      xl: "max-w-4xl",
    },
  },
  defaultVariants: { size: "md" },
});
