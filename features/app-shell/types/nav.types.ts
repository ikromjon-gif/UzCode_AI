import type { LucideIcon } from "lucide-react";

/**
 * UzCode AI — Shared navigation item shape.
 * `href` is a plain string (not Next's typed Route) since three of
 * these items (Templates, Marketplace, Analytics) intentionally have
 * no page yet this sprint — see nav-items.ts.
 */
export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  children?: NavItem[];
}
