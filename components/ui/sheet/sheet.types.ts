import type * as DialogPrimitive from "@radix-ui/react-dialog";
import type { VariantProps } from "class-variance-authority";
import type * as React from "react";

import type { sheetContentVariants } from "./sheet.variants";

export type SheetProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Root>;

export interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    VariantProps<typeof sheetContentVariants> {}
