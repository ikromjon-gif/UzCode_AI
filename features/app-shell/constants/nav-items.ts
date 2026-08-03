import {
  LayoutDashboard,
  FolderKanban,
  MessageSquare,
  LayoutTemplate,
  Store,
  Rocket,
  BarChart3,
  Settings,
  User,
  CreditCard,
  Users,
  KeyRound,
} from "lucide-react";

import type { NavItem } from "../types/nav.types";

/**
 * UzCode AI — Sidebar menu structure (menu shape only — no data
 * fetching, no active-project awareness yet).
 *
 * Only Workspace / Projects / AI Chat / Deploy / Settings have a real
 * route behind them this sprint (see app/(app)/). Templates,
 * Marketplace, and Analytics render as nav items without a page yet —
 * intentional per this sprint's explicit route scope; clicking them
 * is inert until their sprint builds the route.
 *
 * Settings demonstrates nested navigation support: its children all
 * point at /settings for now (no sub-routes exist yet) so the UI
 * capability is visible without producing dead links.
 */
export const primaryNavItems: NavItem[] = [
  { label: "Workspace", href: "/workspace", icon: LayoutDashboard },
  { label: "Projects", href: "/projects", icon: FolderKanban },
  { label: "AI Chat", href: "/ai-chat", icon: MessageSquare },
  { label: "Templates", href: "/templates", icon: LayoutTemplate },
  { label: "Marketplace", href: "/marketplace", icon: Store },
  { label: "Deploy", href: "/deploy", icon: Rocket },
  { label: "Analytics", href: "/analytics", icon: BarChart3 },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
    children: [
      { label: "Profile", href: "/settings", icon: User },
      { label: "Billing", href: "/settings", icon: CreditCard },
      { label: "Team", href: "/settings", icon: Users },
      { label: "API Keys", href: "/settings", icon: KeyRound },
    ],
  },
];
