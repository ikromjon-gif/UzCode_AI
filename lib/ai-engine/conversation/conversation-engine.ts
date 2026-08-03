import { buildPrompt } from "../prompt/prompt-builder";
import { validatePrompt } from "../prompt/prompt-validator";
import { summarizeContext } from "../context/context-engine";
import type { ConversationRequest, ConversationResult, ConversationStage } from "./conversation.types";

/**
 * UzCode AI — Conversation Engine
 * Runs the 8-stage pipeline end to end, but stage 5
 * ("provider-request-placeholder") never calls a network — it
 * returns a fixed stub string and the pipeline proceeds with that.
 * This is the architecture Sprint 11 (AI Chat provider integration,
 * per the roadmap) will extend by replacing exactly that one stage.
 */
export function runConversationPipeline(request: ConversationRequest): ConversationResult {
  const stagesCompleted: ConversationStage[] = [];
  const errors: string[] = [];

  // 1. Input
  stagesCompleted.push("input");
  const userInput = request.userInput.trim();

  // 2. Validation
  stagesCompleted.push("validation");
  if (!userInput) {
    errors.push("Empty user input.");
    return { stagesCompleted, prompt: null, response: null, updatedHistory: request.history, errors };
  }

  // 3. Context Merge
  stagesCompleted.push("context-merge");
  const contextSummary = summarizeContext(request.context);

  // 4. Prompt Build
  stagesCompleted.push("prompt-build");
  const prompt = buildPrompt({
    systemPrompt: "You are UzCode AI, a senior engineering assistant embedded in the workspace.",
    workspaceContext: contextSummary,
    conversationContext: request.history,
    userPrompt: userInput,
  });

  const validation = validatePrompt(prompt);
  if (!validation.valid) {
    errors.push(...validation.errors);
    return { stagesCompleted, prompt, response: null, updatedHistory: request.history, errors };
  }

  // 5. Provider Request Placeholder — NEVER a real network call.
  stagesCompleted.push("provider-request-placeholder");
  const response =
    "[UzCode AI] No provider is connected yet. This is a static placeholder response from the Conversation Engine's architecture, not a model.";

  // 6. Response Placeholder (post-stub shaping — still no model involved)
  stagesCompleted.push("response-placeholder");

  // 7. Post Processing
  stagesCompleted.push("post-processing");
  const processedResponse = response.trim();

  // 8. History Update
  stagesCompleted.push("history-update");
  const updatedHistory = [...request.history, userInput, processedResponse];

  return { stagesCompleted, prompt, response: processedResponse, updatedHistory, errors };
}
