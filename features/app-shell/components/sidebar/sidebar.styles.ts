export const sidebarBase =
  "flex h-full flex-col border-r border-border bg-sidebar transition-[width] " +
  "duration-[var(--duration-base)] ease-[var(--ease-in-out)]";

export const sidebarWidthExpanded = "w-64";
export const sidebarWidthCollapsed = "w-16";

export const navItemBase =
  "flex items-center gap-3 rounded-button px-3 py-2 text-sm font-medium text-muted-foreground " +
  "transition-colors duration-[var(--duration-fast)] focus-ring hover:bg-muted hover:text-foreground";

export const navItemActive = "bg-primary/10 text-primary hover:bg-primary/10 hover:text-primary";
