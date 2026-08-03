import * as React from "react";

import { cn } from "@/lib/utils";

import { cardVariants } from "./card.variants";
import {
  cardHeaderBase,
  cardTitleBase,
  cardDescriptionBase,
  cardContentBase,
  cardFooterBase,
} from "./card.styles";
import type {
  CardProps,
  CardHeaderProps,
  CardTitleProps,
  CardDescriptionProps,
  CardContentProps,
  CardFooterProps,
} from "./card.types";

/**
 * UzCode AI — Card (compound component)
 * Card + CardHeader/CardTitle/CardDescription/CardContent/CardFooter
 * ship from one file since they only ever compose together — matches
 * the shadcn/ui convention and avoids five near-empty single-purpose files.
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, padding, interactive, ...props }, ref) => (
    <div ref={ref} className={cn(cardVariants({ padding, interactive }), className)} {...props} />
  ),
);
Card.displayName = "Card";

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn(cardHeaderBase, className)} {...props} />
  ),
);
CardHeader.displayName = "CardHeader";

export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn(cardTitleBase, className)} {...props} />
  ),
);
CardTitle.displayName = "CardTitle";

export const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn(cardDescriptionBase, className)} {...props} />
  ),
);
CardDescription.displayName = "CardDescription";

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn(cardContentBase, className)} {...props} />
  ),
);
CardContent.displayName = "CardContent";

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn(cardFooterBase, className)} {...props} />
  ),
);
CardFooter.displayName = "CardFooter";
