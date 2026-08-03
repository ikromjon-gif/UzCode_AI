import type { AgentPlan } from "./agent.types";

/**
 * UzCode AI — Reflection (placeholder)
 * Explicitly a placeholder per the sprint brief. A future sprint
 * would use this to critique/revise a completed plan against its
 * original goal — that critique requires a live model.
 */
export class Reflection {
  reflect(_plan: AgentPlan): string {
    throw new Error("Reflection.reflect is not implemented yet — placeholder for a future sprint.");
  }
}
