export interface AppBreadcrumbSegment {
  label: string;
  href?: string;
}

export interface AppBreadcrumbProps {
  items: AppBreadcrumbSegment[];
}
