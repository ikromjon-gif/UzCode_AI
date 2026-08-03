export type LogLevel = "request" | "response" | "error" | "warning" | "debug" | "performance";

/**
 * UzCode AI — Logger
 * Structured console output only — no file writing, no remote log
 * shipping. This is the one designated place console output is
 * intentional; the project's `no-console` rule only allows
 * console.warn/console.error by default, so the other levels here
 * carry a targeted eslint-disable on exactly the line that needs it
 * — the rule itself is untouched, and every other file in the
 * codebase still gets flagged normally for stray console usage.
 */
export class Logger {
  private prefix = "[UzCode AI Runtime]";

  request(message: string, meta?: Record<string, unknown>): void {
    // eslint-disable-next-line no-console -- intentional structured logging
    console.log(`${this.prefix} [request]`, message, meta ?? "");
  }

  response(message: string, meta?: Record<string, unknown>): void {
    // eslint-disable-next-line no-console -- intentional structured logging
    console.log(`${this.prefix} [response]`, message, meta ?? "");
  }

  error(message: string, meta?: Record<string, unknown>): void {
    console.error(`${this.prefix} [error]`, message, meta ?? "");
  }

  warn(message: string, meta?: Record<string, unknown>): void {
    console.warn(`${this.prefix} [warning]`, message, meta ?? "");
  }

  debug(message: string, meta?: Record<string, unknown>): void {
    // eslint-disable-next-line no-console -- intentional structured logging
    console.debug(`${this.prefix} [debug]`, message, meta ?? "");
  }

  performance(label: string, durationMs: number): void {
    // eslint-disable-next-line no-console -- intentional structured logging
    console.log(`${this.prefix} [performance]`, `${label}: ${durationMs}ms`);
  }
}

export const runtimeLogger = new Logger();
