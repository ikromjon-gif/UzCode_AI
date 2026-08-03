import type { ProviderAdapter } from "../../providers/provider.types";
import { getModelsByProvider } from "../../models/model-registry";
import type { RawOllamaResponse } from "../response/response.types";
import { getMockReplyText } from "./mock-response-text";

/** UzCode AI — OllamaAdapter. Implements Sprint 9's ProviderAdapter. Mock only, no local process spawned. */
export class OllamaAdapter implements ProviderAdapter {
  readonly id = "ollama" as const;

  async listModels(): Promise<string[]> {
    return getModelsByProvider(this.id).map((m) => m.id);
  }

  async sendMessage(_request: unknown): Promise<unknown> {
    const mock: RawOllamaResponse = {
      model: "ollama-local-model",
      message: { role: "assistant", content: getMockReplyText("Ollama (Local)") },
      done: true,
      prompt_eval_count: 128,
      eval_count: 64,
    };
    return mock;
  }
}
