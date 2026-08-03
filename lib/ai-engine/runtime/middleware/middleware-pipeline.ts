import type { MiddlewareContext, RegisteredMiddleware, MiddlewareType } from "./middleware.types";

/**
 * UzCode AI — Middleware Pipeline
 * The pipeline mechanism (registration + ordered execution) is real
 * — it's a plain in-memory function composition, the same kind of
 * architecture as Express/Koa middleware. What's NOT real is any
 * individual middleware doing actual AI work; see
 * built-in-middleware.ts, where every function is a pass-through or
 * pure annotation.
 */
export class MiddlewarePipeline {
  private middlewares: RegisteredMiddleware[] = [];

  use(middleware: RegisteredMiddleware): void {
    this.middlewares.push(middleware);
  }

  run(initial: MiddlewareContext, type?: MiddlewareType): MiddlewareContext {
    const applicable = type ? this.middlewares.filter((m) => m.type === type) : this.middlewares;
    return applicable.reduce((context, middleware) => middleware.run(context), initial);
  }

  list(): RegisteredMiddleware[] {
    return [...this.middlewares];
  }
}
