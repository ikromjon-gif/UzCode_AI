export const drawerContentBase =
  "fixed inset-x-0 bottom-0 z-[var(--z-modal)] flex max-h-[85vh] flex-col rounded-t-modal " +
  "border-t border-border bg-card p-6 shadow-modal " +
  "data-[state=open]:animate-in data-[state=closed]:animate-out " +
  "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom focus-ring";

export const drawerHandleBase = "mx-auto mb-4 h-1.5 w-12 shrink-0 rounded-full bg-border";
