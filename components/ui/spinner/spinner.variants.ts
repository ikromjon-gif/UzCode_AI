import { cva } from "class-variance-authority";

export const spinnerVariants = cva("animate-spin text-primary", {
  variants: {
    size: {
      sm: "h-4 w-4",
      md: "h-6 w-6",
      lg: "h-8 w-8",
    },
  },
  defaultVariants: { size: "md" },
});
