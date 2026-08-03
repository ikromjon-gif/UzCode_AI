import { cva } from "class-variance-authority";

import { sheetContentBase } from "./sheet.styles";

/**
 * `side` controls slide direction — Sheet is the side-panel variant
 * of the shared Dialog primitive (see Drawer for the bottom-panel variant).
 */
export const sheetContentVariants = cva(sheetContentBase, {
  variants: {
    side: {
      right:
        "inset-y-0 right-0 h-full w-3/4 max-w-sm border-l " +
        "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right",
      left:
        "inset-y-0 left-0 h-full w-3/4 max-w-sm border-r " +
        "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left",
    },
  },
  defaultVariants: { side: "right" },
});
