import { cva } from "class-variance-authority";

import { gridBase } from "./grid.styles";

export const gridVariants = cva(gridBase, {
  variants: {
    cols: {
      1: "grid-cols-1",
      2: "grid-cols-1 sm:grid-cols-2",
      3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
      6: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6",
      12: "grid-cols-12",
    },
    gap: {
      1: "gap-1",
      2: "gap-2",
      3: "gap-3",
      4: "gap-4",
      6: "gap-6",
      8: "gap-8",
    },
  },
  defaultVariants: { cols: 3, gap: 4 },
});
