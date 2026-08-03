export interface ToolCallResult {
  id: string;
  name: string;
  arguments: Record<string, unknown>;
}

export interface UsageMetadata {
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
}

export type FinishReason = "stop" | "length" | "tool-calls" | "content-filter" | "unknown";

/**
 * The single internal shape every provider's response is parsed
 * INTO, regardless of how differently each one shapes its own reply.
 */
export interface UnifiedResponse {
  text: string;
  reasoning: string | null;
  toolCalls: ToolCallResult[];
  usage: UsageMetadata;
  finishReason: FinishReason;
  metadata: Record<string, unknown>;
}

/**
 * Raw mock response shapes, one per provider family — what
 * adapters/*.ts actually construct and return. Deliberately distinct
 * per provider (different field names/nesting) since that's the
 * whole reason a Response Parser is needed.
 */
export interface RawAnthropicResponse {
  id: string;
  type: "message";
  role: "assistant";
  model: string;
  content: { type: "text"; text: string }[];
  stop_reason: "end_turn" | "max_tokens" | "tool_use";
  usage: { input_tokens: number; output_tokens: number };
}

export interface RawOpenAiCompatibleResponse {
  id: string;
  object: "chat.completion";
  model: string;
  choices: { index: number; message: { role: "assistant"; content: string }; finish_reason: "stop" | "length" | "tool_calls" }[];
  usage: { prompt_tokens: number; completion_tokens: number; total_tokens: number };
}

export interface RawGeminiResponse {
  candidates: { content: { parts: { text: string }[]; role: "model" }; finishReason: "STOP" | "MAX_TOKENS" }[];
  usageMetadata: { promptTokenCount: number; candidatesTokenCount: number; totalTokenCount: number };
}

export interface RawOllamaResponse {
  model: string;
  message: { role: "assistant"; content: string };
  done: true;
  prompt_eval_count: number;
  eval_count: number;
}

export interface RawCustomResponse {
  text: string;
  meta: Record<string, unknown>;
}
