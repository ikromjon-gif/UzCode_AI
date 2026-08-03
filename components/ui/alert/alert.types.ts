import type * as React from "react";
import type { VariantProps } from "class-variance-authority";

import type { alertVariants } from "./alert.variants";

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  icon?: React.ReactNode;
}

export type AlertTitleProps = React.HTMLAttributes<HTMLHeadingElement>;
export type AlertDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;
