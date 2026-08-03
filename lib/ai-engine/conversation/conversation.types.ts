import type { BuiltPrompt } from "../prompt/prompt.types";
import type { AiContextSnapshot } from "../context/context.types";

export type ConversationStage =
  | "input"
  | "validation"
  | "context-merge"
  | "prompt-build"
  | "provider-request-placeholder"
  | "response-placeholder"
  | "post-processing"
  | "history-update";

export interface ConversationRequest {
  userInput: string;
  context: AiContextSnapshot;
  history: string[];
}

export interface ConversationResult {
  stagesCompleted: ConversationStage[];
  prompt: BuiltPrompt | null;
  /** Always the static stub below this sprint — never a real provider response. */
  response: string | null;
  updatedHistory: string[];
  errors: string[];
}
