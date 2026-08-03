import * as React from "react";

import { cn } from "@/lib/utils";

import { tableRowVariants } from "./table.variants";
import {
  tableWrapperBase,
  tableBase,
  tableHeaderBase,
  tableBodyBase,
  tableHeadBase,
  tableCellBase,
  tableCaptionBase,
} from "./table.styles";
import type {
  TableProps,
  TableHeaderProps,
  TableBodyProps,
  TableRowProps,
  TableHeadProps,
  TableCellProps,
  TableCaptionProps,
} from "./table.types";

/**
 * UzCode AI — Table
 * Plain semantic HTML (<table><thead><tbody>) — no dependency. Real
 * sorting/filtering/pagination logic is DataTable's concern (Sprint 3
 * foundation only; wired to real data in a later sprint).
 */
export const Table = React.forwardRef<HTMLTableElement, TableProps>(({ className, ...props }, ref) => (
  <div className={tableWrapperBase}>
    <table ref={ref} className={cn(tableBase, className)} {...props} />
  </div>
));
Table.displayName = "Table";

export const TableHeader = React.forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ className, ...props }, ref) => <thead ref={ref} className={cn(tableHeaderBase, className)} {...props} />,
);
TableHeader.displayName = "TableHeader";

export const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, ...props }, ref) => <tbody ref={ref} className={cn(tableBodyBase, className)} {...props} />,
);
TableBody.displayName = "TableBody";

export const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, striped, dense, ...props }, ref) => (
    <tr ref={ref} className={cn(tableRowVariants({ striped, dense }), className)} {...props} />
  ),
);
TableRow.displayName = "TableRow";

export const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, ...props }, ref) => <th ref={ref} className={cn(tableHeadBase, className)} {...props} />,
);
TableHead.displayName = "TableHead";

export const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, ...props }, ref) => <td ref={ref} className={cn(tableCellBase, className)} {...props} />,
);
TableCell.displayName = "TableCell";

export const TableCaption = React.forwardRef<HTMLTableCaptionElement, TableCaptionProps>(
  ({ className, ...props }, ref) => (
    <caption ref={ref} className={cn(tableCaptionBase, className)} {...props} />
  ),
);
TableCaption.displayName = "TableCaption";
