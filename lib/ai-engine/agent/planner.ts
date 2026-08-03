import type { AgentRunInput, AgentPlan } from "./agent.types";

/**
 * UzCode AI — Planner
 * Contract only. `createPlan` throws — actual planning logic (asking
 * a model to break a goal into steps) requires a live provider,
 * explicitly out of scope this sprint.
 */
export class Planner {
  createPlan(_input: AgentRunInput): AgentPlan {
    throw new Error("Planner.createPlan is not implemented yet — requires a connected provider.");
  }
}
