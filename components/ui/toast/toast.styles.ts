export const toastViewportBase =
  "fixed bottom-0 right-0 z-[var(--z-toast)] flex max-h-screen w-full flex-col gap-2 p-4 sm:max-w-sm";

export const toastBase =
  "relative flex w-full items-center justify-between gap-3 overflow-hidden rounded-card border p-4 shadow-hover " +
  "data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out " +
  "data-[state=closed]:fade-out-0 data-[state=open]:slide-in-from-right-full data-[state=closed]:slide-out-to-right-full";

export const toastActionBase =
  "inline-flex h-8 shrink-0 items-center justify-center rounded-button border border-border bg-transparent " +
  "px-3 text-sm font-medium transition-colors hover:bg-muted focus-ring";

export const toastCloseBase =
  "absolute right-2 top-2 rounded-[calc(var(--radius-button)/2)] opacity-[var(--opacity-hover)] " +
  "transition-opacity hover:opacity-100 focus-ring";
