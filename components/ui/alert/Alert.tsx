import * as React from "react";

import { cn } from "@/lib/utils";

import { alertVariants } from "./alert.variants";
import { alertTitleBase, alertDescriptionBase } from "./alert.styles";
import type { AlertProps, AlertTitleProps, AlertDescriptionProps } from "./alert.types";

/**
 * UzCode AI — Alert
 * Static inline message. `role="alert"` makes screen readers announce
 * it immediately when it mounts — appropriate for validation/status
 * messages, not for content that's already on the page at load time.
 */
export function Alert({ className, variant, icon, children, ...props }: AlertProps) {
  return (
    <div role="alert" className={cn(alertVariants({ variant }), className)} {...props}>
      {icon}
      <div className="flex flex-1 flex-col gap-1">{children}</div>
    </div>
  );
}

export function AlertTitle({ className, ...props }: AlertTitleProps) {
  return <h5 className={cn(alertTitleBase, className)} {...props} />;
}

export function AlertDescription({ className, ...props }: AlertDescriptionProps) {
  return <div className={cn(alertDescriptionBase, className)} {...props} />;
}
