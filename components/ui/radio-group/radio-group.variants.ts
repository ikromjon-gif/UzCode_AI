import { cva } from "class-variance-authority";

import { radioGroupBase, radioItemBase } from "./radio-group.styles";

export const radioGroupVariants = cva(radioGroupBase, {
  variants: {
    orientation: {
      vertical: "grid-flow-row",
      horizontal: "grid-flow-col auto-cols-max",
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
});

export const radioItemVariants = cva(radioItemBase, { variants: {}, defaultVariants: {} });
