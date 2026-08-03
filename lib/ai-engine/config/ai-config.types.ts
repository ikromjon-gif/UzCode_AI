import type { ProviderId } from "../providers/provider.types";

export type ReasoningLevel = "low" | "medium" | "high";

export interface AiConfiguration {
  providerId: ProviderId;
  modelId: string;
  temperature: number;
  topP: number;
  maxTokens: number;
  reasoningLevel: ReasoningLevel;
  streaming: boolean;
  vision: boolean;
  toolCalling: boolean;
}
