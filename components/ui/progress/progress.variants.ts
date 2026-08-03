import { cva } from "class-variance-authority";

import { progressTrackBase } from "./progress.styles";

export const progressVariants = cva(progressTrackBase, {
  variants: {
    size: {
      sm: "h-1.5",
      md: "h-2",
      lg: "h-3",
    },
  },
  defaultVariants: { size: "md" },
});
