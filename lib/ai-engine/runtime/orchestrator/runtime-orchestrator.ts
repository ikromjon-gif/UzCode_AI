import { createRuntimeRequest, transitionStage, failRequest } from "../lifecycle/request-lifecycle";
import { injectContext } from "../context-injection/context-injection";
import { assemblePrompt } from "../prompt-assembly/prompt-assembly";
import { estimateTokens } from "../token-estimator/token-estimator";
import { selectProvider, providerManager } from "../provider-selection/provider-selection";
import { processResponse } from "../response-pipeline/response-pipeline";
import { buildUnifiedRequest } from "../../provider-integration";
import { MetricsCollector } from "../metrics/metrics-collector";
import { runtimeLogger } from "../logger/logger";
import { runtimeEventBus } from "../event-bus/event-bus";
import type { RuntimeRunInput, RuntimeRunResult } from "./runtime-orchestrator.types";

/**
 * UzCode AI — Runtime Orchestrator
 * Ties every runtime module into one pipeline, following the exact
 * 8 stages named in the sprint brief. The ONLY stage that touches
 * Sprint 10 is "Execute Placeholder" — it resolves a mock
 * ProviderAdapter (Sprint 10) and calls its sendMessage(), which
 * returns static provider-shaped data with zero networking. See
 * this sprint's Architecture Decision for why that's the intended
 * use of Sprint 10's mock adapters, not a violation of "no provider
 * execution."
 */
export class RuntimeOrchestrator {
  private metrics = new MetricsCollector();

  getMetrics(): MetricsCollector {
    return this.metrics;
  }

  async run(input: RuntimeRunInput): Promise<RuntimeRunResult> {
    // 1. Initialize Runtime
    let request = createRuntimeRequest(`req-${Date.now()}`);
    runtimeEventBus.emit("request-started", { requestId: request.id });
    runtimeLogger.request("Runtime request started", { id: request.id });

    const errors: string[] = [];

    // 2. Build Request (validate input shape)
    request = transitionStage(request, "validated");
    if (!input.userPrompt.trim()) {
      request = failRequest(request, "Empty user prompt.");
      this.metrics.recordError();
      runtimeEventBus.emit("runtime-error", { requestId: request.id, reason: "empty-prompt" });
      return { request, providerSelection: null, tokenEstimate: null, response: null, errors: ["Empty user prompt."] };
    }

    // 3. Inject Context
    request = transitionStage(request, "context-ready");
    const context = injectContext({
      workspaceSnapshot: input.workspaceSnapshot,
      conversationHistory: input.conversationHistory,
      memory: input.memory,
      pinnedContext: input.pinnedContext,
    });

    // 4. Prompt Build + Estimate Tokens
    request = transitionStage(request, "prompt-built");
    const assembled = assemblePrompt(context, input.userPrompt, input.filesContext);
    if (!assembled.validation.valid) {
      errors.push(...assembled.validation.errors);
      request = failRequest(request, assembled.validation.errors.join("; "));
      this.metrics.recordError();
      return { request, providerSelection: null, tokenEstimate: null, response: null, errors };
    }
    const tokenEstimate = estimateTokens(assembled.estimatedSize, 0, input.preferredModelId);

    // 5. Resolve Provider
    request = transitionStage(request, "provider-selected");
    const providerSelection = selectProvider({ preferredProviderId: input.preferredProviderId, preferredModelId: input.preferredModelId });
    runtimeEventBus.emit("provider-selected", { providerId: providerSelection.providerId, usedFallback: providerSelection.usedFallback });
    if (!providerSelection.valid) {
      errors.push(providerSelection.reason ?? "No provider available.");
      request = failRequest(request, providerSelection.reason ?? "No provider available.");
      this.metrics.recordError();
      return { request, providerSelection, tokenEstimate, response: null, errors };
    }

    // 6. Execute Placeholder — calls a Sprint 10 MOCK adapter, no network.
    request = transitionStage(request, "executing-placeholder");
    const adapter = providerManager.resolveAdapter(providerSelection.providerId);
    if (!adapter) {
      request = failRequest(request, `No adapter resolved for ${providerSelection.providerId}.`);
      this.metrics.recordError();
      return { request, providerSelection, tokenEstimate, response: null, errors: [`No adapter resolved for ${providerSelection.providerId}.`] };
    }
    const rawResponse = await adapter.sendMessage(
      buildUnifiedRequest({
        model: providerSelection.modelId,
        systemPrompt: context.systemPrompt,
        developerPrompt: context.developerPrompt,
        workspaceContext: assembled.prompt.segments.find((s) => s.kind === "workspace-context")?.content,
        filesContext: input.filesContext,
        conversationContext: input.conversationHistory,
        userPrompt: input.userPrompt,
        settings: { temperature: 0.7, topP: 1, maxTokens: 4096 },
      }),
    );

    // 7. Process Response
    request = transitionStage(request, "response-parsed");
    const response = processResponse(rawResponse, providerSelection.providerId);
    runtimeEventBus.emit("response-received", { requestId: request.id });

    // 8. Finalize
    request = transitionStage(request, "completed");
    this.metrics.recordRequest(providerSelection.providerId, tokenEstimate.totalTokens, tokenEstimate.estimatedCostUsd);
    this.metrics.recordSuccess();
    runtimeEventBus.emit("request-completed", { requestId: request.id });
    runtimeLogger.response("Runtime request completed", { id: request.id, stage: request.stage });

    return { request, providerSelection, tokenEstimate, response, errors };
  }
}
