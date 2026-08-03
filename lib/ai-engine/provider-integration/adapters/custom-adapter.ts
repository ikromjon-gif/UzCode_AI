import type { ProviderAdapter } from "../../providers/provider.types";
import { getModelsByProvider } from "../../models/model-registry";
import type { RawCustomResponse } from "../response/response.types";
import { getMockReplyText } from "./mock-response-text";

/**
 * UzCode AI — CustomAdapter
 * Implements Sprint 9's ProviderAdapter with the loosest response
 * shape (a self-hosted/OpenAI-compatible-or-not endpoint the user
 * points UzCode AI at). Mock only — no fetch, no assumed wire format.
 */
export class CustomAdapter implements ProviderAdapter {
  readonly id = "custom" as const;

  async listModels(): Promise<string[]> {
    return getModelsByProvider(this.id).map((m) => m.id);
  }

  async sendMessage(_request: unknown): Promise<unknown> {
    const mock: RawCustomResponse = {
      text: getMockReplyText("Custom Provider"),
      meta: { note: "Custom provider shape is user-defined; this is illustrative only." },
    };
    return mock;
  }
}
