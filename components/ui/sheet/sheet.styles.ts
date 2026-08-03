export const sheetContentBase =
  "fixed z-[var(--z-modal)] gap-4 border-border bg-card p-6 shadow-modal " +
  "data-[state=open]:animate-in data-[state=closed]:animate-out focus-ring";

export const sheetCloseBase =
  "absolute right-4 top-4 rounded-[calc(var(--radius-button)/2)] opacity-[var(--opacity-hover)] " +
  "transition-opacity hover:opacity-100 focus-ring disabled:pointer-events-none";
