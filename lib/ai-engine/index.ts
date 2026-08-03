/**
 * UzCode AI — AI Engine barrel.
 * Architecture only — see each subfolder's header comments for what
 * is (and isn't) actually implemented this sprint.
 */

// Providers
export { providerRegistry, getProvider, listProviders } from "./providers/provider-registry";
export type { ProviderId, ProviderDefinition, ProviderAdapter } from "./providers/provider.types";

// Models
export { modelRegistry, getModelsByProvider, getModel } from "./models/model-registry";
export type { ModelDefinition, ModelCapabilities, ModelPricing } from "./models/model.types";

// Tools
export { toolRegistry, getToolsByCategory, getTool } from "./tools/tool-registry";
export type { ToolDefinition, ToolCategory, ToolExecutor } from "./tools/tool.types";

// Prompt
export { buildPrompt } from "./prompt/prompt-builder";
export { validatePrompt } from "./prompt/prompt-validator";
export type { PromptSegment, PromptBuildInput, BuiltPrompt, PromptValidationResult } from "./prompt/prompt.types";

// Context
export { collectContext, summarizeContext } from "./context/context-engine";
export type { AiContextSnapshot, OpenTabContext, SelectionContext, CursorPositionContext, DiagnosticContext } from "./context/context.types";

// Memory
export { addMemory, getMemoryByScope, clearScope } from "./memory/memory-engine";
export type { MemoryEntry, MemoryScope } from "./memory/memory.types";

// Agent
export { Planner } from "./agent/planner";
export { Reasoner } from "./agent/reasoner";
export { Executor } from "./agent/executor";
export { ToolRouter } from "./agent/tool-router";
export { ResponseBuilder } from "./agent/response-builder";
export { Reflection } from "./agent/reflection";
export type { AgentRole, AgentStep, AgentPlan, AgentRunInput } from "./agent/agent.types";

// Conversation
export { runConversationPipeline } from "./conversation/conversation-engine";
export type { ConversationStage, ConversationRequest, ConversationResult } from "./conversation/conversation.types";

// Config
export { defaultAiConfig } from "./config/default-config";
export type { AiConfiguration, ReasoningLevel } from "./config/ai-config.types";

// Store
export { useAiStore } from "./store/ai-store";

// Provider Integration (Sprint 10)
export * from "./provider-integration";

// Runtime (Sprint 11)
export * from "./runtime";
