import { cva } from "class-variance-authority";

import { tableRowBase } from "./table.styles";

export const tableRowVariants = cva(tableRowBase, {
  variants: {
    striped: {
      true: "odd:bg-muted/40",
      false: "hover:bg-muted/40",
    },
    dense: {
      true: "[&>td]:p-2 [&>th]:h-9",
      false: "",
    },
  },
  defaultVariants: { striped: false, dense: false },
});
