import type * as React from "react";
import type { VariantProps } from "class-variance-authority";

import type { cardVariants } from "./card.variants";

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

export type CardHeaderProps = React.HTMLAttributes<HTMLDivElement>;
export type CardTitleProps = React.HTMLAttributes<HTMLHeadingElement>;
export type CardDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;
export type CardContentProps = React.HTMLAttributes<HTMLDivElement>;
export type CardFooterProps = React.HTMLAttributes<HTMLDivElement>;
