/**
 * UzCode AI — App Shell feature barrel.
 * Route layouts should only need AppShell; WorkspaceLayout is
 * exported separately for routes that specifically need a
 * left/center/right panel arrangement (e.g. the future Workspace
 * Explorer route), not every route.
 */
export { AppShell } from "./components/app-shell";
export { WorkspaceLayout } from "./components/workspace-layout";
export { RouteSlotPlaceholder } from "./components/route-slot-placeholder";
export { primaryNavItems } from "./constants/nav-items";
export type { NavItem } from "./types/nav.types";
