export type RuntimeEventType =
  | "request-started"
  | "request-completed"
  | "provider-selected"
  | "response-received"
  | "tool-requested"
  | "tool-completed"
  | "runtime-error";

export interface RuntimeEvent {
  type: RuntimeEventType;
  timestamp: string;
  payload?: Record<string, unknown>;
}

type Listener = (event: RuntimeEvent) => void;

/**
 * UzCode AI — Event Bus
 * The pub/sub mechanism itself is real (genuine subscribe/emit, an
 * in-memory Map of listeners). What makes this "no event execution"
 * per the brief: zero listeners are attached anywhere in this
 * codebase that perform real work (no tool run on "tool-requested",
 * no network call on "provider-selected") — the Orchestrator only
 * emits events for a future sprint's real listeners to consume.
 */
export class EventBus {
  private listeners = new Map<RuntimeEventType, Set<Listener>>();

  on(type: RuntimeEventType, listener: Listener): () => void {
    if (!this.listeners.has(type)) this.listeners.set(type, new Set());
    this.listeners.get(type)!.add(listener);
    return () => this.off(type, listener);
  }

  off(type: RuntimeEventType, listener: Listener): void {
    this.listeners.get(type)?.delete(listener);
  }

  emit(type: RuntimeEventType, payload?: Record<string, unknown>): void {
    const event: RuntimeEvent = { type, timestamp: new Date().toISOString(), payload };
    this.listeners.get(type)?.forEach((listener) => listener(event));
  }
}

export const runtimeEventBus = new EventBus();
