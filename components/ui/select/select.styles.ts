export const selectTriggerBase =
  "flex w-full items-center justify-between gap-2 rounded-input border border-input bg-card " +
  "px-3 text-sm text-foreground transition-colors duration-[var(--duration-fast)] focus-ring " +
  "disabled:cursor-not-allowed disabled:opacity-[var(--opacity-disabled)] " +
  "data-[placeholder]:text-muted-foreground";

export const selectContentBase =
  "relative z-[var(--z-popover)] min-w-[8rem] overflow-hidden rounded-card border border-border " +
  "bg-card text-foreground shadow-hover";

export const selectItemBase =
  "relative flex w-full cursor-pointer select-none items-center rounded-[calc(var(--radius-input)/2.5)] " +
  "py-1.5 pl-8 pr-2 text-sm outline-none transition-colors duration-[var(--duration-fast)] " +
  "focus:bg-muted data-[disabled]:pointer-events-none data-[disabled]:opacity-[var(--opacity-disabled)]";
