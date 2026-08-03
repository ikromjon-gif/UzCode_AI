import { cva } from "class-variance-authority";

import { selectTriggerBase } from "./select.styles";

export const selectTriggerVariants = cva(selectTriggerBase, {
  variants: {
    size: {
      sm: "h-8",
      md: "h-10",
      lg: "h-12",
    },
  },
  defaultVariants: { size: "md" },
});
