import { Sparkles, Brain, Gem, Zap, Network, HardDrive } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import type { AiModel } from "../types/chat.types";

/**
 * UzCode AI — Model list (UI only).
 * No API client exists for any of these — selecting one only updates
 * `selectedModel` in chat-store, per this sprint's explicit scope.
 */
export const aiModels: (AiModel & { icon: LucideIcon })[] = [
  { id: "claude", label: "Claude", provider: "Anthropic", icon: Sparkles },
  { id: "gpt", label: "GPT", provider: "OpenAI", icon: Brain },
  { id: "gemini", label: "Gemini", provider: "Google", icon: Gem },
  { id: "deepseek", label: "DeepSeek", provider: "DeepSeek", icon: Zap },
  { id: "openrouter", label: "OpenRouter", provider: "OpenRouter", icon: Network },
  { id: "local", label: "Local Model", provider: "Ollama", icon: HardDrive },
];
