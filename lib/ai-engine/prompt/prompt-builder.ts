import type { PromptBuildInput, BuiltPrompt, PromptSegment } from "./prompt.types";

/**
 * UzCode AI — Prompt Builder
 * Pure function: assembles ordered PromptSegments from the input
 * pieces. No provider is called, nothing is sent anywhere — the
 * output is just structured data a future ConversationEngine stage
 * would hand to a ProviderAdapter.
 */
export function buildPrompt(input: PromptBuildInput): BuiltPrompt {
  const segments: PromptSegment[] = [];

  if (input.systemPrompt) segments.push({ kind: "system", content: input.systemPrompt });
  if (input.developerPrompt) segments.push({ kind: "developer", content: input.developerPrompt });
  if (input.workspaceContext) segments.push({ kind: "workspace-context", content: input.workspaceContext });
  if (input.selectedFiles?.length) {
    segments.push({ kind: "selected-files", content: input.selectedFiles.join("\n") });
  }
  if (input.editorContext) segments.push({ kind: "editor-context", content: input.editorContext });
  if (input.conversationContext?.length) {
    segments.push({ kind: "conversation-context", content: input.conversationContext.join("\n") });
  }
  if (input.pinnedContext?.length) {
    segments.push({ kind: "pinned-context", content: input.pinnedContext.join("\n") });
  }
  segments.push({ kind: "user-prompt", content: input.userPrompt });

  const approxLength = segments.reduce((total, s) => total + s.content.length, 0);

  return { segments, approxLength };
}
