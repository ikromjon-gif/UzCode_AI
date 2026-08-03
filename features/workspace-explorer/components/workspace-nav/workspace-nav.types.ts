import type * as React from "react";

export interface NavSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}
