export const treeBase = "flex flex-col";

export const treeItemBase =
  "group flex h-7 w-full cursor-pointer select-none items-center gap-1.5 rounded-[calc(var(--radius-input)/3)] " +
  "pr-1.5 text-sm text-foreground transition-colors duration-[var(--duration-fast)] focus-ring " +
  "hover:bg-muted";

export const treeItemSelected = "bg-primary/10 text-primary hover:bg-primary/10";

export const treeIndentUnit = 14; // px per depth level — mirrors the 4px spacing scale (roughly 1 unit)

export const treeChevronBase =
  "flex h-4 w-4 shrink-0 items-center justify-center text-muted-foreground transition-transform " +
  "duration-[var(--duration-fast)]";

export const treeIconBase = "h-4 w-4 shrink-0 text-muted-foreground";
export const treeIconFolder = "text-accent";

export const treeLabelBase = "flex-1 truncate";

export const treeActionsBase =
  "flex shrink-0 items-center opacity-0 transition-opacity duration-[var(--duration-fast)] " +
  "group-hover:opacity-100 group-focus-within:opacity-100 group-data-[selected=true]:opacity-100";
