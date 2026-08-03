import { cn } from "@/lib/utils";

import { emptyStateVariants } from "./empty-state.variants";
import { emptyStateIconBase, emptyStateTitleBase, emptyStateDescriptionBase } from "./empty-state.styles";
import type { EmptyStateProps } from "./empty-state.types";

/** UzCode AI — EmptyState. "No data yet" placeholder (empty project list, empty search results, etc.). */
export function EmptyState({
  className,
  icon,
  heading,
  description,
  action,
  ...props
}: EmptyStateProps) {
  return (
    <div className={cn(emptyStateVariants(), className)} {...props}>
      {icon ? <div className={emptyStateIconBase}>{icon}</div> : null}
     <p className={emptyStateTitleBase}>{heading}</p>
      {description ? <p className={emptyStateDescriptionBase}>{description}</p> : null}
      {action}
    </div>
  );
}
