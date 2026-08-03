import type { RegisteredMiddleware } from "./middleware.types";

/**
 * UzCode AI — Built-in Middleware
 * One pre-built middleware per type from the sprint brief. Each is a
 * pass-through that only annotates `context.data` with a marker —
 * none performs real validation, provider calls, or logging (the
 * Logger/MetricsCollector modules own those; these middleware slots
 * exist so the Orchestrator has a place to call them from later
 * without restructuring the pipeline).
 */
export const requestMiddleware: RegisteredMiddleware = {
  type: "request",
  name: "request-received",
  run: (ctx) => ({ ...ctx, data: { ...ctx.data, requestSeenAt: new Date().toISOString() } }),
};

export const contextMiddleware: RegisteredMiddleware = {
  type: "context",
  name: "context-pass-through",
  run: (ctx) => ({ ...ctx, data: { ...ctx.data, contextInjected: true } }),
};

export const promptMiddleware: RegisteredMiddleware = {
  type: "prompt",
  name: "prompt-pass-through",
  run: (ctx) => ({ ...ctx, data: { ...ctx.data, promptAssembled: true } }),
};

export const validationMiddleware: RegisteredMiddleware = {
  type: "validation",
  name: "validation-pass-through",
  run: (ctx) => ({ ...ctx, data: { ...ctx.data, validated: true } }),
};

export const providerMiddleware: RegisteredMiddleware = {
  type: "provider",
  name: "provider-pass-through",
  run: (ctx) => ({ ...ctx, data: { ...ctx.data, providerResolved: true } }),
};

export const responseMiddleware: RegisteredMiddleware = {
  type: "response",
  name: "response-pass-through",
  run: (ctx) => ({ ...ctx, data: { ...ctx.data, responseNormalized: true } }),
};

export const metricsMiddleware: RegisteredMiddleware = {
  type: "metrics",
  name: "metrics-marker",
  run: (ctx) => ({ ...ctx, data: { ...ctx.data, metricsRecorded: true } }),
};

export const loggingMiddleware: RegisteredMiddleware = {
  type: "logging",
  name: "logging-marker",
  run: (ctx) => ({ ...ctx, data: { ...ctx.data, logged: true } }),
};

export const errorMiddleware: RegisteredMiddleware = {
  type: "error",
  name: "error-pass-through",
  run: (ctx) => ctx,
};

export const allBuiltInMiddleware: RegisteredMiddleware[] = [
  requestMiddleware,
  contextMiddleware,
  promptMiddleware,
  validationMiddleware,
  providerMiddleware,
  responseMiddleware,
  metricsMiddleware,
  loggingMiddleware,
  errorMiddleware,
];
