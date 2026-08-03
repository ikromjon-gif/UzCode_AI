import { cva } from "class-variance-authority";

import { scrollBarBase } from "./scroll-area.styles";

export const scrollBarVariants = cva(scrollBarBase, {
  variants: {
    orientation: {
      vertical: "h-full w-2.5 border-l border-l-transparent p-px",
      horizontal: "h-2.5 flex-col border-t border-t-transparent p-px",
    },
  },
  defaultVariants: { orientation: "vertical" },
});
