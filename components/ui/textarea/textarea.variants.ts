import { cva } from "class-variance-authority";

import { textareaBase } from "./textarea.styles";

export const textareaVariants = cva(textareaBase, {
  variants: {
    invalid: {
      true: "border-destructive focus-visible:outline-destructive",
      false: "",
    },
  },
  defaultVariants: {
    invalid: false,
  },
});
