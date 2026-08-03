import { cva } from "class-variance-authority";

import { cardBase } from "./card.styles";

export const cardVariants = cva(cardBase, {
  variants: {
    padding: {
      none: "",
      sm: "[&>*]:p-4",
      md: "",
      lg: "[&>*]:p-8",
    },
    interactive: {
      true: "transition-shadow duration-[var(--duration-fast)] hover:shadow-hover cursor-pointer",
      false: "",
    },
  },
  defaultVariants: { padding: "md", interactive: false },
});
