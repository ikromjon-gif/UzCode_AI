import type * as React from "react";

export interface PaginationProps extends React.ComponentPropsWithoutRef<"nav"> {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface PaginationItemProps extends React.ComponentPropsWithoutRef<"button"> {
  active?: boolean;
}
