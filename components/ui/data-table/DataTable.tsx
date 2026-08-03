import * as React from "react";

import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";

import { dataTableEmptyCellBase } from "./data-table.styles";
import type { ColumnDef, DataTableProps } from "./data-table.types";

/**
 * UzCode AI — DataTable (foundation)
 * Generic, presentational-only table renderer built on the Table
 * primitives. No sort/filter/pagination state — purely `columns +
 * data in, rows out`. A later sprint adds interactive state on top
 * without changing this component's contract.
 */
export function DataTable<TRow>({
  columns,
  data,
  getRowId,
  striped,
  dense,
  emptyState,
}: DataTableProps<TRow>) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={column.id} className={column.className}>
              {column.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length === 0 ? (
          <TableRow>
            <TableCell colSpan={columns.length} className={dataTableEmptyCellBase}>
              {emptyState ?? "No data"}
            </TableCell>
          </TableRow>
        ) : (
          data.map((row) => (
            <TableRow key={getRowId(row)} striped={striped} dense={dense}>
              {columns.map((column) => (
                <TableCell key={column.id} className={column.className}>
                  {column.cell(row)}
                </TableCell>
              ))}
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
