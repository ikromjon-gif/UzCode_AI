import type * as React from "react";
import type { VariantProps } from "class-variance-authority";

import type { tableRowVariants } from "./table.variants";

export type TableProps = React.TableHTMLAttributes<HTMLTableElement>;
export type TableHeaderProps = React.HTMLAttributes<HTMLTableSectionElement>;
export type TableBodyProps = React.HTMLAttributes<HTMLTableSectionElement>;
export interface TableRowProps
  extends React.HTMLAttributes<HTMLTableRowElement>,
    VariantProps<typeof tableRowVariants> {}
export type TableHeadProps = React.ThHTMLAttributes<HTMLTableCellElement>;
export type TableCellProps = React.TdHTMLAttributes<HTMLTableCellElement>;
export type TableCaptionProps = React.HTMLAttributes<HTMLTableCaptionElement>;
