/**
 * UzCode AI — Root placeholder route.
 *
 * This is intentionally NOT the Landing Page (that is Sprint 5 scope).
 * It exists only so the App Router has a valid entry route and the
 * Sprint 1 acceptance criteria (npm run dev / npm run build) can be
 * verified end-to-end.
 */
export default function RootPlaceholderPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-2 px-4 text-center">
      <p className="font-mono text-sm text-muted-foreground">Sprint 1 — Project Foundation</p>
      <h1 className="text-2xl font-semibold tracking-tight">UzCode AI</h1>
      <p className="text-sm text-muted-foreground">
        Foundation scaffold ready. Application pages begin in later sprints.
      </p>
    </main>
  );
}
