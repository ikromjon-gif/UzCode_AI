import { buildPrompt } from "../../prompt/prompt-builder";
import { validatePrompt } from "../../prompt/prompt-validator";
import { summarizeContext } from "../../context/context-engine";
import type { BuiltPrompt, PromptValidationResult } from "../../prompt/prompt.types";
import type { InjectedContext } from "../context-injection/context-injection";

/**
 * UzCode AI — Prompt Assembly (runtime layer)
 * Thin composition over Sprint 9's buildPrompt/validatePrompt — adds
 * nothing new to prompt construction itself, just wires an
 * InjectedContext (this sprint's shape) into Sprint 9's
 * PromptBuildInput and returns validation + a size estimate together,
 * which the Orchestrator wants as one step.
 */
export interface AssembledPrompt {
  prompt: BuiltPrompt;
  validation: PromptValidationResult;
  estimatedSize: number;
}

export function assemblePrompt(context: InjectedContext, userPrompt: string, filesContext?: string[]): AssembledPrompt {
  const prompt = buildPrompt({
    systemPrompt: context.systemPrompt,
    developerPrompt: context.developerPrompt,
    workspaceContext: summarizeContext(context.workspace),
    selectedFiles: filesContext,
    conversationContext: context.conversation,
    pinnedContext: context.pinned,
    userPrompt,
  });

  return {
    prompt,
    validation: validatePrompt(prompt),
    estimatedSize: prompt.approxLength,
  };
}
