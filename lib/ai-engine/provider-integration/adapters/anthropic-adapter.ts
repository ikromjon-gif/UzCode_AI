import type { ProviderAdapter } from "../../providers/provider.types";
import { getModelsByProvider } from "../../models/model-registry";
import { buildProviderRequest } from "../request/request-builder";
import type { UnifiedRequest } from "../request/request.types";
import type { RawAnthropicResponse } from "../response/response.types";
import { getMockReplyText } from "./mock-response-text";

/**
 * UzCode AI — AnthropicAdapter
 * Implements Sprint 9's ProviderAdapter. sendMessage() builds a
 * real Anthropic-shaped request object (via buildProviderRequest)
 * and returns a mock Anthropic-shaped response — no fetch, no SDK.
 */
export class AnthropicAdapter implements ProviderAdapter {
  readonly id = "anthropic" as const;

  async listModels(): Promise<string[]> {
    return getModelsByProvider(this.id).map((m) => m.id);
  }

  async sendMessage(request: unknown): Promise<unknown> {
    const unified = request as UnifiedRequest;
    const providerRequest = buildProviderRequest(unified, this.id);

    const mock: RawAnthropicResponse = {
      id: `msg_mock_${Date.now()}`,
      type: "message",
      role: "assistant",
      model: providerRequest.kind === "anthropic" ? providerRequest.model : unified.model,
      content: [{ type: "text", text: getMockReplyText("Anthropic") }],
      stop_reason: "end_turn",
      usage: { input_tokens: 128, output_tokens: 64 },
    };
    return mock;
  }
}
