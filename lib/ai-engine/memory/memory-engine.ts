import type { MemoryEntry, MemoryScope } from "./memory.types";

/**
 * UzCode AI — Memory Engine
 * Pure in-memory operations over an array the CALLER owns and
 * persists (or, this sprint, doesn't — see store/ai-store.ts, which
 * holds the actual array with no persist middleware). This module
 * has no database and no module-level mutable state of its own.
 */
export function addMemory(entries: MemoryEntry[], entry: Omit<MemoryEntry, "id" | "createdAt">): MemoryEntry[] {
  const newEntry: MemoryEntry = {
    ...entry,
    id: `memory-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
  };
  return [...entries, newEntry];
}

export function getMemoryByScope(entries: MemoryEntry[], scope: MemoryScope): MemoryEntry[] {
  return entries.filter((e) => e.scope === scope);
}

export function clearScope(entries: MemoryEntry[], scope: MemoryScope): MemoryEntry[] {
  return entries.filter((e) => e.scope !== scope);
}
