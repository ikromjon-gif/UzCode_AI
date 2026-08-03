import { Construction } from "lucide-react";

import { EmptyState } from "@/components/ui/empty-state";

/**
 * UzCode AI — RouteSlotPlaceholder
 * Shared placeholder for the 5 routes prepared this sprint
 * (Workspace/Projects/AI Chat/Deploy/Settings) — composes Sprint 3's
 * EmptyState rather than duplicating the same markup 5 times across
 * page.tsx files.
 */
export function RouteSlotPlaceholder({ routeName }: { routeName: string }) {
  return (
    <div className="flex h-full items-center justify-center p-6">
      <EmptyState
        icon={<Construction aria-hidden="true" />}
        title={`${routeName} — coming soon`}
        description="This route is wired into the application shell. Its content ships in a later sprint."
      />
    </div>
  );
}
