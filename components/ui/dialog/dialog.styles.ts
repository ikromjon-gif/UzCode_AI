export const dialogOverlayBase =
  "fixed inset-0 z-[var(--z-modal-backdrop)] bg-black/50 backdrop-blur-[var(--blur-panel)] " +
  "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0";

export const dialogContentBase =
  "fixed left-1/2 top-1/2 z-[var(--z-modal)] w-full max-w-lg -translate-x-1/2 -translate-y-1/2 " +
  "rounded-modal border border-border bg-card p-6 shadow-modal " +
  "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 " +
  "data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 focus-ring";

export const dialogCloseBase =
  "absolute right-4 top-4 rounded-[calc(var(--radius-button)/2)] opacity-[var(--opacity-hover)] " +
  "transition-opacity hover:opacity-100 focus-ring disabled:pointer-events-none";

export const dialogHeaderBase = "flex flex-col gap-1.5 text-center sm:text-left";
export const dialogFooterBase = "mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end";
export const dialogTitleBase = "text-lg font-semibold text-foreground";
export const dialogDescriptionBase = "text-sm text-muted-foreground";
