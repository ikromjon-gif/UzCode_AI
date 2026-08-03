export type RequestStage =
  | "created"
  | "validated"
  | "context-ready"
  | "prompt-built"
  | "provider-selected"
  | "executing-placeholder"
  | "response-parsed"
  | "completed"
  | "failed"
  | "cancelled";

export interface RuntimeRequest {
  id: string;
  stage: RequestStage;
  stageHistory: RequestStage[];
  createdAt: string;
  updatedAt: string;
  error: string | null;
}
