import type { ToolDefinition } from "../tools/tool.types";
import type { AiContextSnapshot } from "../context/context.types";

export type AgentRole = "planner" | "reasoner" | "executor" | "tool-router" | "response-builder" | "reflection";

export interface AgentStep {
  id: string;
  role: AgentRole;
  description: string;
  status: "pending" | "in-progress" | "done";
}

export interface AgentPlan {
  goal: string;
  steps: AgentStep[];
}

export interface AgentRunInput {
  goal: string;
  context: AiContextSnapshot;
  availableTools: ToolDefinition[];
}
