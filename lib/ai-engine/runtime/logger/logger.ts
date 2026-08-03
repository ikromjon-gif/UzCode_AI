export type LogLevel = "request" | "response" | "error" | "warning" | "debug" | "performance";

/**
 * UzCode AI — Logger
 * Structured console output only — no file writing, no remote log
 * shipping. Genuinely calls console.*; this is diagnostic tooling,
 * not AI execution.
 */
export class Logger {
  private prefix = "[UzCode AI Runtime]";

  request(message: string, meta?: Record<string, unknown>): void {
    console.log(`${this.prefix} [request]`, message, meta ?? "");
  }

  response(message: string, meta?: Record<string, unknown>): void {
    console.log(`${this.prefix} [response]`, message, meta ?? "");
  }

  error(message: string, meta?: Record<string, unknown>): void {
    console.error(`${this.prefix} [error]`, message, meta ?? "");
  }

  warn(message: string, meta?: Record<string, unknown>): void {
    console.warn(`${this.prefix} [warning]`, message, meta ?? "");
  }

  debug(message: string, meta?: Record<string, unknown>): void {
    console.debug(`${this.prefix} [debug]`, message, meta ?? "");
  }

  performance(label: string, durationMs: number): void {
    console.log(`${this.prefix} [performance]`, `${label}: ${durationMs}ms`);
  }
}

export const runtimeLogger = new Logger();
