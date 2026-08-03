export type MemoryScope = "session" | "conversation" | "workspace" | "pinned" | "temporary";

export interface MemoryEntry {
  id: string;
  scope: MemoryScope;
  content: string;
  createdAt: string;
}
