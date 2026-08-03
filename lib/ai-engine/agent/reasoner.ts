import type { AgentStep } from "./agent.types";
import type { AiContextSnapshot } from "../context/context.types";

/** UzCode AI — Reasoner. Contract only — reasoning requires a live model. */
export class Reasoner {
  reason(_step: AgentStep, _context: AiContextSnapshot): string {
    throw new Error("Reasoner.reason is not implemented yet — requires a connected provider.");
  }
}
