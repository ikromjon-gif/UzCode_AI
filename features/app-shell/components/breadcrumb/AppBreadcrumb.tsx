import * as React from "react";

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import type { AppBreadcrumbProps } from "./app-breadcrumb.types";

/**
 * UzCode AI — AppBreadcrumb
 * Thin wrapper over Sprint 3's Breadcrumb primitives. Takes `items`
 * as props rather than deriving them from usePathname() — automatic
 * pathname-to-label resolution needs real page metadata that doesn't
 * exist until routes have actual content, so that logic is deferred.
 */
export function AppBreadcrumb({ items }: AppBreadcrumbProps) {
  if (items.length === 0) return null;

  return (
    <Breadcrumb className="hidden md:block">
      <BreadcrumbList>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <React.Fragment key={item.label}>
              <BreadcrumbItem>
                {isLast || !item.href ? (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
