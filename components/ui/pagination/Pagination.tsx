"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { paginationItemVariants } from "./pagination.variants";
import { paginationBase } from "./pagination.styles";
import type { PaginationProps, PaginationItemProps } from "./pagination.types";

/**
 * UzCode AI — Pagination
 * Plain semantic HTML (<nav aria-label="pagination">) with real
 * page-number buttons — no Radix primitive needed. Prev/Next are
 * disabled (not hidden) at the boundaries so focus order stays stable.
 */
export function PaginationItem({ className, active, ...props }: PaginationItemProps) {
  return (
    <button
      type="button"
      aria-current={active ? "page" : undefined}
      className={cn(paginationItemVariants({ active }), className)}
      {...props}
    />
  );
}

export function Pagination({ className, currentPage, totalPages, onPageChange, ...props }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav aria-label="pagination" className={cn(paginationBase, className)} {...props}>
      <PaginationItem
        aria-label="Previous page"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <ChevronLeft className="h-4 w-4" aria-hidden="true" />
      </PaginationItem>

      {pages.map((page) => (
        <PaginationItem key={page} active={page === currentPage} onClick={() => onPageChange(page)}>
          {page}
        </PaginationItem>
      ))}

      <PaginationItem
        aria-label="Next page"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <ChevronRight className="h-4 w-4" aria-hidden="true" />
      </PaginationItem>
    </nav>
  );
}
