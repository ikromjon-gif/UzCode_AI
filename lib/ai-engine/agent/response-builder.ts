import type { AgentStep } from "./agent.types";

/**
 * UzCode AI — ResponseBuilder
 * Genuinely functional — pure data assembly (combining completed
 * steps' descriptions into a summary string), not model generation.
 */
export class ResponseBuilder {
  build(steps: AgentStep[]): string {
    const completed = steps.filter((s) => s.status === "done");
    if (completed.length === 0) return "No steps completed yet.";
    return completed.map((s) => `- ${s.description}`).join("\n");
  }
}
