import type * as React from "react";

import type { AppBreadcrumbSegment } from "../breadcrumb";

export interface AppShellProps {
  children: React.ReactNode;
  breadcrumb?: AppBreadcrumbSegment[];
  workspaceName?: string;
  projectName?: string;
}
