import { cva } from "class-variance-authority";

import { dropdownContentBase, dropdownItemBase } from "./dropdown-menu.styles";

export const dropdownContentVariants = cva(dropdownContentBase, { variants: {}, defaultVariants: {} });
export const dropdownItemVariants = cva(dropdownItemBase, {
  variants: {
    destructive: {
      true: "text-destructive focus:bg-destructive focus:text-destructive-foreground",
      false: "",
    },
  },
  defaultVariants: { destructive: false },
});
