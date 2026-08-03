import { cva } from "class-variance-authority";

import { skeletonBase } from "./skeleton.styles";

export const skeletonVariants = cva(skeletonBase, {
  variants: {
    radius: {
      button: "rounded-button",
      input: "rounded-input",
      card: "rounded-card",
      avatar: "rounded-avatar",
    },
  },
  defaultVariants: { radius: "card" },
});
