import type { AgentStep } from "./agent.types";

/**
 * UzCode AI — Executor
 * Contract only. This is the one class explicitly forbidden from
 * doing anything real this sprint ("do not execute tools") — even
 * once a Planner/Reasoner exist, Executor stays a stub until a later
 * sprint deliberately adds tool execution with its own safety review.
 */
export class Executor {
  async executeStep(_step: AgentStep): Promise<unknown> {
    throw new Error("Executor.executeStep is not implemented yet — tool execution is out of scope.");
  }
}
