import type { BuiltPrompt, PromptValidationResult } from "./prompt.types";

/**
 * UzCode AI — Prompt Validator
 * Pure structural checks — no provider-specific token limit is
 * enforced (that requires a real tokenizer + the model's actual
 * context window, both out of scope this sprint).
 */
const MAX_APPROX_LENGTH = 200_000;

export function validatePrompt(prompt: BuiltPrompt): PromptValidationResult {
  const errors: string[] = [];

  const userSegment = prompt.segments.find((s) => s.kind === "user-prompt");
  if (!userSegment || !userSegment.content.trim()) {
    errors.push("A user prompt is required.");
  }

  if (prompt.approxLength > MAX_APPROX_LENGTH) {
    errors.push("Prompt exceeds the approximate length ceiling.");
  }

  return { valid: errors.length === 0, errors };
}
