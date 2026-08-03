import type { AiContextSnapshot, OpenTabContext, SelectionContext, CursorPositionContext } from "../../context/context.types";
import type { MemoryEntry } from "../../memory/memory.types";

/**
 * UzCode AI — Context Injection
 * Runtime-level composition on top of Sprint 9's Context Engine —
 * adds conversation/memory/pinned-context/system+developer prompt
 * slots that Sprint 9's collectContext() didn't carry, without
 * duplicating its filesystem/tabs/selection/cursor logic. No
 * filesystem is read here either — every field comes from the input.
 */
export interface RuntimeContextInput {
  workspaceSnapshot: AiContextSnapshot;
  conversationHistory: string[];
  memory: MemoryEntry[];
  pinnedContext: string[];
  systemPrompt?: string;
  developerPrompt?: string;
}

export interface InjectedContext {
  workspace: AiContextSnapshot;
  conversation: string[];
  memory: MemoryEntry[];
  pinned: string[];
  systemPrompt: string;
  developerPrompt: string;
}

export function injectContext(input: RuntimeContextInput): InjectedContext {
  return {
    workspace: input.workspaceSnapshot,
    conversation: input.conversationHistory,
    memory: input.memory,
    pinned: input.pinnedContext,
    systemPrompt: input.systemPrompt ?? "You are UzCode AI, a senior engineering assistant embedded in the workspace.",
    developerPrompt: input.developerPrompt ?? "",
  };
}

// Re-exported for convenience so runtime consumers don't need a
// separate import from lib/ai-engine/context for these shared shapes.
export type { OpenTabContext, SelectionContext, CursorPositionContext };
