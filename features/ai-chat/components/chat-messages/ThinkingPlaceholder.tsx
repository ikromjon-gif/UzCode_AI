import { Sparkles } from "lucide-react";

/** UzCode AI — ThinkingPlaceholder. Shown while status === "thinking" — no real reasoning stream. */
export function ThinkingPlaceholder({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Sparkles className="h-4 w-4 animate-pulse text-accent" aria-hidden="true" />
      <span className="italic">{label}</span>
    </div>
  );
}
