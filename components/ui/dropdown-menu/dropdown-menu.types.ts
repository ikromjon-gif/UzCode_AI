import type * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import type { VariantProps } from "class-variance-authority";
import type * as React from "react";

import type { dropdownItemVariants } from "./dropdown-menu.variants";

export type DropdownMenuContentProps = React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>;

export interface DropdownMenuItemProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item>,
    VariantProps<typeof dropdownItemVariants> {}
