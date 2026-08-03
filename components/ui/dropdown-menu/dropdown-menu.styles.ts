export const dropdownContentBase =
  "z-[var(--z-dropdown)] min-w-[10rem] overflow-hidden rounded-card border border-border bg-card " +
  "p-1 text-foreground shadow-hover data-[state=open]:animate-in data-[state=closed]:animate-out " +
  "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95";

export const dropdownItemBase =
  "relative flex cursor-pointer select-none items-center gap-2 rounded-[calc(var(--radius-input)/2.5)] " +
  "px-2 py-1.5 text-sm outline-none transition-colors duration-[var(--duration-fast)] " +
  "focus:bg-muted data-[disabled]:pointer-events-none data-[disabled]:opacity-[var(--opacity-disabled)]";

export const dropdownLabelBase = "px-2 py-1.5 text-xs font-medium text-muted-foreground";
export const dropdownSeparatorBase = "my-1 h-px bg-border";
