import type { Port } from "../types/panel.types";

/** Static demo data — no real port scanning/networking this sprint. */
export const samplePorts: Port[] = [
  { id: "port-3000", port: 3000, protocol: "http", status: "open", label: "Next.js Dev Server" },
  { id: "port-5432", port: 5432, protocol: "tcp", status: "closed", label: "PostgreSQL" },
];
