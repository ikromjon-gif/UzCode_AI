import { cva } from "class-variance-authority";

import { labelBase } from "./label.styles";

export const labelVariants = cva(labelBase, {
  variants: {
    required: {
      true: "after:ml-0.5 after:text-destructive after:content-['*']",
      false: "",
    },
  },
  defaultVariants: {
    required: false,
  },
});
