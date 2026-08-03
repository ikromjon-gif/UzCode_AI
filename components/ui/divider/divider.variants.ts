import { cva } from "class-variance-authority";

export const dividerVariants = cva("flex items-center", {
  variants: {
    spacing: {
      sm: "my-2",
      md: "my-4",
      lg: "my-6",
    },
  },
  defaultVariants: { spacing: "md" },
});
