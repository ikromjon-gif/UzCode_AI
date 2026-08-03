/**
 * UzCode AI — Footer (app shell)
 * Minimal in-app footer, not the marketing footer (that belongs to
 * the Landing Page, Sprint 5, and is a separate component).
 */
export function Footer() {
  return (
    <footer className="flex h-8 shrink-0 items-center justify-center border-t border-border text-xs text-muted-foreground">
      <span>© {new Date().getFullYear()} UzCode AI</span>
    </footer>
  );
}
