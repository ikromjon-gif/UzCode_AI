import type * as React from "react";

import type { DialogContentProps } from "@/components/ui/dialog";

export interface ModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title: React.ReactNode;
  description?: React.ReactNode;
  footer?: React.ReactNode;
  size?: DialogContentProps["size"];
  children?: React.ReactNode;
}
