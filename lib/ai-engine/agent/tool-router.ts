import { getTool, getToolsByCategory } from "../tools/tool-registry";
import type { ToolDefinition, ToolCategory } from "../tools/tool.types";

/**
 * UzCode AI — ToolRouter
 * Genuinely functional (unlike Planner/Reasoner/Executor) — routing
 * is just looking up a ToolDefinition by id/category from the
 * registry, not executing it. Selecting a tool is architecture;
 * running one is the line this sprint doesn't cross.
 */
export class ToolRouter {
  route(toolId: string): ToolDefinition | undefined {
    return getTool(toolId);
  }

  routeByCategory(category: ToolCategory): ToolDefinition[] {
    return getToolsByCategory(category);
  }
}
