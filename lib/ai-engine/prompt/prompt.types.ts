/**
 * UzCode AI — Prompt Pipeline types
 * A "prompt" here is a structured collection of segments, not a
 * single string sent anywhere. Ordering below is the order a future
 * sprint's provider adapter would concatenate/format them in.
 */
export interface PromptSegment {
  kind:
    | "system"
    | "developer"
    | "workspace-context"
    | "selected-files"
    | "editor-context"
    | "conversation-context"
    | "pinned-context"
    | "user-prompt";
  content: string;
}

export interface PromptBuildInput {
  systemPrompt?: string;
  developerPrompt?: string;
  workspaceContext?: string;
  selectedFiles?: string[];
  editorContext?: string;
  conversationContext?: string[];
  pinnedContext?: string[];
  userPrompt: string;
}

export interface BuiltPrompt {
  segments: PromptSegment[];
  /** Rough character-length total — a stand-in for a real tokenizer, not one. */
  approxLength: number;
}

export interface PromptValidationResult {
  valid: boolean;
  errors: string[];
}
