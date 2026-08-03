import type { Problem } from "../types/panel.types";

/** Static demo data — no real diagnostics/type-checker runs this sprint. */
export const sampleProblems: Problem[] = [
  { id: "p1", severity: "error", message: "Cannot find name 'foo'.", file: "app/page.tsx", line: 12 },
  { id: "p2", severity: "warning", message: "'unusedVar' is declared but never used.", file: "lib/utils.ts", line: 4 },
  { id: "p3", severity: "info", message: "Consider using const instead of let.", file: "features/editor/store/editor-store.ts", line: 30 },
];
