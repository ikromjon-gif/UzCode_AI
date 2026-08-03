import { cva } from "class-variance-authority";

import { separatorBase } from "./separator.styles";

export const separatorVariants = cva(separatorBase, {
  variants: {
    orientation: {
      horizontal: "h-px w-full",
      vertical: "h-full w-px",
    },
  },
  defaultVariants: { orientation: "horizontal" },
});
