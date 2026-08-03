import type { RuntimeRequest } from "../lifecycle/request-lifecycle.types";

export type MiddlewareType =
  | "request"
  | "context"
  | "prompt"
  | "validation"
  | "provider"
  | "response"
  | "metrics"
  | "logging"
  | "error";

/**
 * Middleware mutates (returns a new copy of) a shared, growable data
 * bag alongside the request's lifecycle state. Kept as `unknown`-ish
 * `Record<string, unknown>` rather than a rigid shape since different
 * middleware types annotate different fields (e.g. logging middleware
 * adds a log entry, metrics middleware adds a counter snapshot).
 */
export interface MiddlewareContext {
  request: RuntimeRequest;
  data: Record<string, unknown>;
}

export type MiddlewareFn = (context: MiddlewareContext) => MiddlewareContext;

export interface RegisteredMiddleware {
  type: MiddlewareType;
  name: string;
  run: MiddlewareFn;
}
