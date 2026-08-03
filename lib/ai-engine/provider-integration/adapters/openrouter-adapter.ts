import type { ProviderAdapter } from "../../providers/provider.types";
import { getModelsByProvider } from "../../models/model-registry";
import { buildProviderRequest } from "../request/request-builder";
import type { UnifiedRequest } from "../request/request.types";
import type { RawOpenAiCompatibleResponse } from "../response/response.types";
import { getMockReplyText } from "./mock-response-text";

/**
 * UzCode AI — OpenRouterAdapter
 * Implements Sprint 9's ProviderAdapter. OpenRouter uses the
 * OpenAI-compatible chat-completions shape in practice, so this
 * mirrors that request/response format — mock only, no fetch.
 */
export class OpenRouterAdapter implements ProviderAdapter {
  readonly id = "openrouter" as const;

  async listModels(): Promise<string[]> {
    return getModelsByProvider(this.id).map((m) => m.id);
  }

  async sendMessage(request: unknown): Promise<unknown> {
    const unified = request as UnifiedRequest;
    const providerRequest = buildProviderRequest(unified, this.id);

    const mock: RawOpenAiCompatibleResponse = {
      id: `chatcmpl_mock_${Date.now()}`,
      object: "chat.completion",
      model: providerRequest.kind === "openai-compatible" ? providerRequest.model : unified.model,
      choices: [
        {
          index: 0,
          message: { role: "assistant", content: getMockReplyText("OpenRouter") },
          finish_reason: "stop",
        },
      ],
      usage: { prompt_tokens: 128, completion_tokens: 64, total_tokens: 192 },
    };
    return mock;
  }
}
