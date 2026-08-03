import { AlertTriangle } from "lucide-react";

import { cn } from "@/lib/utils";

import { errorStateVariants } from "./error-state.variants";
import { errorStateIconBase, errorStateTitleBase, errorStateDescriptionBase } from "./error-state.styles";
import type { ErrorStateProps } from "./error-state.types";

/**
 * UzCode AI — ErrorState
 * `role="alert"` — announced immediately, since a failed load/action
 * is exactly the kind of interruption a screen reader user needs to know about.
 */
export function ErrorState({
  className,
  icon = <AlertTriangle aria-hidden="true" />,
  title = "Something went wrong",
  description,
  action,
  ...props
}: ErrorStateProps) {
  return (
    <div role="alert" className={cn(errorStateVariants(), className)} {...props}>
      <div className={errorStateIconBase}>{icon}</div>
      <p className={errorStateTitleBase}>{title}</p>
      {description ? <p className={errorStateDescriptionBase}>{description}</p> : null}
      {action}
    </div>
  );
}
