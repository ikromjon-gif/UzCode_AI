import { cva } from "class-variance-authority";

import { paginationItemBase, paginationActiveBase, paginationDisabledBase } from "./pagination.styles";

export const paginationItemVariants = cva(paginationItemBase, {
  variants: {
    active: {
      true: paginationActiveBase,
      false: "",
    },
    disabled: {
      true: paginationDisabledBase,
      false: "",
    },
  },
  defaultVariants: { active: false, disabled: false },
});
