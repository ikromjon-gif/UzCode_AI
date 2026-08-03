/**
 * UzCode AI — Provider Layer types
 * Describes a provider's shape and capabilities as data. No client,
 * no SDK, no network call is implemented anywhere in this file or
 * its consumers this sprint.
 */
export type ProviderId =
  | "anthropic"
  | "openai"
  | "gemini"
  | "deepseek"
  | "openrouter"
  | "ollama"
  | "azure-openai"
  | "custom";

export interface ProviderDefinition {
  id: ProviderId;
  label: string;
  requiresApiKey: boolean;
  supportsCustomBaseUrl: boolean;
  isLocal: boolean;
  docsUrl?: string;
}

/**
 * A future sprint implements this per provider (real HTTP client,
 * streaming, auth). Declared here so the shape exists — every method
 * is a contract, not code that runs.
 */
export interface ProviderAdapter {
  id: ProviderId;
  listModels(): Promise<string[]>;
  sendMessage(request: unknown): Promise<unknown>;
}
