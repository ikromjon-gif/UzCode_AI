import type { LogEntry } from "../types/panel.types";

/** Static demo data — no real log stream exists this sprint. */
export const sampleLogs: LogEntry[] = [
  { id: "l1", source: "application", level: "info", message: "App started successfully", timestamp: new Date().toISOString() },
  { id: "l2", source: "system", level: "info", message: "CPU usage: 12%", timestamp: new Date().toISOString() },
  { id: "l3", source: "workspace", level: "warn", message: "Large file detected: bundle.js (2.4MB)", timestamp: new Date().toISOString() },
  { id: "l4", source: "ai", level: "info", message: "AI logs ship in a later sprint", timestamp: new Date().toISOString() },
];
