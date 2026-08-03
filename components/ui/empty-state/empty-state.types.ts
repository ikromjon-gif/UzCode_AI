import type * as React from "react";

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  heading: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
}
