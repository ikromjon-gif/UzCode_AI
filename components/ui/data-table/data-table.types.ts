import type * as React from "react";

/**
 * A single column definition. Sorting/filtering state is intentionally
 * NOT part of this contract — that's application logic (Sprint 3
 * ships the foundation/shape only, per "do not create business logic").
 * A later sprint wires this to TanStack Table or a Zustand-backed
 * sort/filter store without changing this shape.
 */
export interface ColumnDef<TRow> {
  id: string;
  header: React.ReactNode;
  cell: (row: TRow) => React.ReactNode;
  className?: string;
}

export interface DataTableProps<TRow> {
  columns: ColumnDef<TRow>[];
  data: TRow[];
  getRowId: (row: TRow) => string;
  striped?: boolean;
  dense?: boolean;
  emptyState?: React.ReactNode;
}
