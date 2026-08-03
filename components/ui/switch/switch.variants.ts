import { cva } from "class-variance-authority";

import { switchBase, switchThumbBase } from "./switch.styles";

export const switchVariants = cva(switchBase, {
  variants: {
    size: {
      sm: "h-5 w-9",
      md: "h-6 w-11",
    },
  },
  defaultVariants: { size: "md" },
});

export const switchThumbVariants = cva(switchThumbBase, {
  variants: {
    size: {
      sm: "h-4 w-4 data-[state=checked]:translate-x-4",
      md: "h-5 w-5 data-[state=checked]:translate-x-5",
    },
  },
  defaultVariants: { size: "md" },
});
