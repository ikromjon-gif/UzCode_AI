import { cva } from "class-variance-authority";

import { inputBase } from "./input.styles";

export const inputVariants = cva(inputBase, {
  variants: {
    size: {
      sm: "h-8 text-sm",
      md: "h-10 text-sm",
      lg: "h-12 text-base",
    },
    invalid: {
      true: "border-destructive focus-visible:outline-destructive",
      false: "",
    },
  },
  defaultVariants: {
    size: "md",
    invalid: false,
  },
});
