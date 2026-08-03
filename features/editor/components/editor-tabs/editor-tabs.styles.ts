export const editorTabsBase = "flex h-9 shrink-0 items-center overflow-x-auto border-b border-border";

export const editorTabBase =
  "group flex h-full shrink-0 cursor-pointer items-center gap-2 border-r border-border px-3 text-sm " +
  "text-muted-foreground transition-colors duration-[var(--duration-fast)] hover:bg-muted focus-ring";

export const editorTabActive = "bg-card text-foreground";

export const editorTabDirtyDot = "h-1.5 w-1.5 shrink-0 rounded-full bg-foreground";

export const editorTabCloseBase =
  "flex h-4 w-4 shrink-0 items-center justify-center rounded-[calc(var(--radius-button)/3)] " +
  "opacity-0 transition-opacity duration-[var(--duration-fast)] hover:bg-border " +
  "group-hover:opacity-100 group-focus-within:opacity-100";
