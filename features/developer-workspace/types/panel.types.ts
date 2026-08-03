export type ProblemSeverity = "error" | "warning" | "info";

export interface Problem {
  id: string;
  severity: ProblemSeverity;
  message: string;
  file: string;
  line: number;
}

export type LogSource = "application" | "system" | "ai" | "workspace";

export interface LogEntry {
  id: string;
  source: LogSource;
  level: "info" | "warn" | "error";
  message: string;
  timestamp: string;
}

export type PortStatus = "open" | "closed";

export interface Port {
  id: string;
  port: number;
  protocol: "http" | "https" | "tcp";
  status: PortStatus;
  label: string;
}

export type OutputChannel = "application" | "build" | "task" | "extension";

export interface OutputLine {
  id: string;
  channel: OutputChannel;
  text: string;
}
