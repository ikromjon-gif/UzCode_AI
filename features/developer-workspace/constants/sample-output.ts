import type { OutputLine } from "../types/panel.types";

/** Static demo data — no real process output exists this sprint. */
export const sampleOutputLines: OutputLine[] = [
  { id: "o1", channel: "build", text: "$ next build" },
  { id: "o2", channel: "build", text: "▲ Next.js 15.1.0" },
  { id: "o3", channel: "build", text: "Creating an optimized production build …" },
  { id: "o4", channel: "application", text: "[info] Server listening on http://localhost:3000" },
  { id: "o5", channel: "task", text: "Running task: lint" },
  { id: "o6", channel: "extension", text: "[UzCode AI] Extension host started" },
];
