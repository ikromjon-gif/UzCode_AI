import { cva } from "class-variance-authority";

import { stackBase } from "./stack.styles";

/**
 * Gap values map 1:1 to lib/design-tokens/spacing.ts (4px base unit):
 * 1=4px 2=8px 3=12px 4=16px 6=24px 8=32px.
 */
export const stackVariants = cva(stackBase, {
  variants: {
    direction: {
      row: "flex-row",
      column: "flex-col",
    },
    gap: {
      1: "gap-1",
      2: "gap-2",
      3: "gap-3",
      4: "gap-4",
      6: "gap-6",
      8: "gap-8",
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
    },
    justify: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
    },
    wrap: {
      true: "flex-wrap",
      false: "flex-nowrap",
    },
  },
  defaultVariants: { direction: "column", gap: 4, align: "stretch", justify: "start", wrap: false },
});
