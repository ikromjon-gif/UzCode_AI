import type * as React from "react";

export interface EmptyStateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  icon?: React.ReactNode;
  heading: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
}
