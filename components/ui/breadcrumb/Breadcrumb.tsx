import * as React from "react";
import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { breadcrumbVariants } from "./breadcrumb.variants";
import {
  breadcrumbItemBase,
  breadcrumbLinkBase,
  breadcrumbPageBase,
  breadcrumbSeparatorBase,
} from "./breadcrumb.styles";
import type {
  BreadcrumbProps,
  BreadcrumbListProps,
  BreadcrumbItemProps,
  BreadcrumbLinkProps,
  BreadcrumbPageProps,
  BreadcrumbSeparatorProps,
} from "./breadcrumb.types";

/**
 * UzCode AI — Breadcrumb
 * Plain semantic HTML (<nav aria-label="breadcrumb"><ol>...) — no
 * Radix primitive needed, there's no complex interaction to manage.
 */
export function Breadcrumb({ className, ...props }: BreadcrumbProps) {
  return <nav aria-label="breadcrumb" className={className} {...props} />;
}

export function BreadcrumbList({ className, ...props }: BreadcrumbListProps) {
  return <ol className={cn(breadcrumbVariants(), className)} {...props} />;
}

export function BreadcrumbItem({ className, ...props }: BreadcrumbItemProps) {
  return <li className={cn(breadcrumbItemBase, className)} {...props} />;
}

export function BreadcrumbLink({ className, ...props }: BreadcrumbLinkProps) {
  return <a className={cn(breadcrumbLinkBase, className)} {...props} />;
}

export function BreadcrumbPage({ className, ...props }: BreadcrumbPageProps) {
  return <span aria-current="page" className={cn(breadcrumbPageBase, className)} {...props} />;
}

export function BreadcrumbSeparator({ className, ...props }: BreadcrumbSeparatorProps) {
  return (
    <li role="presentation" aria-hidden="true" className={cn(breadcrumbSeparatorBase, className)} {...props}>
      <ChevronRight />
    </li>
  );
}
