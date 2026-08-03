import type { ProviderId } from "../../providers/provider.types";
import type {
  UnifiedResponse,
  RawAnthropicResponse,
  RawOpenAiCompatibleResponse,
  RawGeminiResponse,
  RawOllamaResponse,
  RawCustomResponse,
} from "./response.types";

/**
 * UzCode AI — Response Parser
 * Converts each provider's distinctly-shaped (mock) response into
 * one UnifiedResponse. Pure data transformation — no network
 * involved, works identically whether the raw response came from a
 * mock adapter (this sprint) or a real API call (a future sprint).
 */
export function parseResponse(raw: unknown, providerId: ProviderId): UnifiedResponse {
  switch (providerId) {
    case "anthropic": {
      const r = raw as RawAnthropicResponse;
      return {
        text: r.content.map((c) => c.text).join(""),
        reasoning: null,
        toolCalls: [],
        usage: { inputTokens: r.usage.input_tokens, outputTokens: r.usage.output_tokens, totalTokens: r.usage.input_tokens + r.usage.output_tokens },
        finishReason: r.stop_reason === "end_turn" ? "stop" : r.stop_reason === "max_tokens" ? "length" : "tool-calls",
        metadata: { id: r.id, model: r.model },
      };
    }
    case "openai":
    case "deepseek":
    case "openrouter":
    case "azure-openai": {
      const r = raw as RawOpenAiCompatibleResponse;
      const choice = r.choices[0];
      return {
        text: choice?.message.content ?? "",
        reasoning: null,
        toolCalls: [],
        usage: { inputTokens: r.usage.prompt_tokens, outputTokens: r.usage.completion_tokens, totalTokens: r.usage.total_tokens },
        finishReason: choice?.finish_reason === "stop" ? "stop" : choice?.finish_reason === "length" ? "length" : "tool-calls",
        metadata: { id: r.id, model: r.model },
      };
    }
    case "gemini": {
      const r = raw as RawGeminiResponse;
      const candidate = r.candidates[0];
      return {
        text: candidate?.content.parts.map((p) => p.text).join("") ?? "",
        reasoning: null,
        toolCalls: [],
        usage: {
          inputTokens: r.usageMetadata.promptTokenCount,
          outputTokens: r.usageMetadata.candidatesTokenCount,
          totalTokens: r.usageMetadata.totalTokenCount,
        },
        finishReason: candidate?.finishReason === "STOP" ? "stop" : "length",
        metadata: {},
      };
    }
    case "ollama": {
      const r = raw as RawOllamaResponse;
      return {
        text: r.message.content,
        reasoning: null,
        toolCalls: [],
        usage: { inputTokens: r.prompt_eval_count, outputTokens: r.eval_count, totalTokens: r.prompt_eval_count + r.eval_count },
        finishReason: "stop",
        metadata: { model: r.model },
      };
    }
    case "custom": {
      const r = raw as RawCustomResponse;
      return {
        text: r.text,
        reasoning: null,
        toolCalls: [],
        usage: { inputTokens: 0, outputTokens: 0, totalTokens: 0 },
        finishReason: "unknown",
        metadata: r.meta,
      };
    }
  }
}
