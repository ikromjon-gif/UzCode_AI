import { cva } from "class-variance-authority";

import { avatarBase } from "./avatar.styles";

export const avatarVariants = cva(avatarBase, {
  variants: {
    size: {
      sm: "h-8 w-8 text-xs",
      md: "h-10 w-10 text-sm",
      lg: "h-14 w-14 text-lg",
    },
  },
  defaultVariants: { size: "md" },
});
