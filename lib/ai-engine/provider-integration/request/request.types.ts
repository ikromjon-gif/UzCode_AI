export interface UnifiedMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface ModelSettings {
  temperature: number;
  topP: number;
  maxTokens: number;
}

export interface RequestBuilderInput {
  model: string;
  systemPrompt?: string;
  developerPrompt?: string;
  workspaceContext?: string;
  filesContext?: string[];
  conversationContext?: string[];
  userPrompt: string;
  settings: ModelSettings;
}

/**
 * The normalized shape every provider's request is built FROM.
 * Never sent anywhere itself — buildProviderRequest() maps this into
 * each provider's actual wire format.
 */
export interface UnifiedRequest {
  model: string;
  messages: UnifiedMessage[];
  settings: ModelSettings;
}

/** Provider-specific request object shapes — illustrative, not sent. */
export type ProviderRequest =
  | { kind: "anthropic"; model: string; system: string; messages: { role: "user" | "assistant"; content: string }[]; max_tokens: number; temperature: number }
  | { kind: "openai-compatible"; model: string; messages: UnifiedMessage[]; temperature: number; top_p: number; max_tokens: number }
  | { kind: "gemini"; model: string; systemInstruction: { parts: { text: string }[] }; contents: { role: "user" | "model"; parts: { text: string }[] }[] }
  | { kind: "ollama"; model: string; messages: UnifiedMessage[]; stream: false }
  | { kind: "custom"; model: string; messages: UnifiedMessage[] };
