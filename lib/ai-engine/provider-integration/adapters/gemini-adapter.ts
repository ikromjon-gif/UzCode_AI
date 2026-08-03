import type { ProviderAdapter } from "../../providers/provider.types";
import { getModelsByProvider } from "../../models/model-registry";
import type { UnifiedRequest } from "../request/request.types";
import type { RawGeminiResponse } from "../response/response.types";
import { getMockReplyText } from "./mock-response-text";

/** UzCode AI — GeminiAdapter. Implements Sprint 9's ProviderAdapter. Mock only, no fetch. */
export class GeminiAdapter implements ProviderAdapter {
  readonly id = "gemini" as const;

  async listModels(): Promise<string[]> {
    return getModelsByProvider(this.id).map((m) => m.id);
  }

  async sendMessage(_request: unknown): Promise<unknown> {
    const mock: RawGeminiResponse = {
      candidates: [
        {
          content: { parts: [{ text: getMockReplyText("Gemini") }], role: "model" },
          finishReason: "STOP",
        },
      ],
      usageMetadata: { promptTokenCount: 128, candidatesTokenCount: 64, totalTokenCount: 192 },
    };
    return mock;
  }
}
