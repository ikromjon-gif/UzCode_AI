import type { ProviderId } from "../../providers/provider.types";
import type { RequestBuilderInput, UnifiedRequest, UnifiedMessage, ProviderRequest } from "./request.types";

/**
 * UzCode AI — Request Builder
 * Pure functions only. Nothing here sends anything — the output is
 * data an adapter's sendMessage() would hand to a real HTTP client
 * in a future sprint.
 */
export function buildUnifiedRequest(input: RequestBuilderInput): UnifiedRequest {
  const systemParts = [input.systemPrompt, input.developerPrompt, input.workspaceContext, ...(input.filesContext ?? [])].filter(Boolean);

  const messages: UnifiedMessage[] = [];
  if (systemParts.length) messages.push({ role: "system", content: systemParts.join("\n\n") });

  for (const turn of input.conversationContext ?? []) {
    messages.push({ role: "user", content: turn });
  }

  messages.push({ role: "user", content: input.userPrompt });

  return { model: input.model, messages, settings: input.settings };
}

/**
 * Maps the unified shape into a specific provider's real request
 * format. DeepSeek/OpenRouter/Azure OpenAI are OpenAI-API-compatible
 * in practice, so they share the "openai-compatible" shape here.
 */
export function buildProviderRequest(unified: UnifiedRequest, providerId: ProviderId): ProviderRequest {
  switch (providerId) {
    case "anthropic": {
      const system = unified.messages.find((m) => m.role === "system")?.content ?? "";
      const messages = unified.messages.filter((m) => m.role !== "system") as { role: "user" | "assistant"; content: string }[];
      return { kind: "anthropic", model: unified.model, system, messages, max_tokens: unified.settings.maxTokens, temperature: unified.settings.temperature };
    }
    case "openai":
    case "deepseek":
    case "openrouter":
    case "azure-openai":
      return {
        kind: "openai-compatible",
        model: unified.model,
        messages: unified.messages,
        temperature: unified.settings.temperature,
        top_p: unified.settings.topP,
        max_tokens: unified.settings.maxTokens,
      };
    case "gemini": {
      const system = unified.messages.find((m) => m.role === "system")?.content ?? "";
      const contents = unified.messages
        .filter((m) => m.role !== "system")
        .map((m) => ({ role: (m.role === "assistant" ? "model" : "user") as "user" | "model", parts: [{ text: m.content }] }));
      return { kind: "gemini", model: unified.model, systemInstruction: { parts: [{ text: system }] }, contents };
    }
    case "ollama":
      return { kind: "ollama", model: unified.model, messages: unified.messages, stream: false };
    case "custom":
      return { kind: "custom", model: unified.model, messages: unified.messages };
  }
}
