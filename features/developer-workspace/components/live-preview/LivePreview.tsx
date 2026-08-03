"use client";

import { MonitorPlay } from "lucide-react";

import { LoadingState } from "@/components/ui/loading-state";
import { ErrorState } from "@/components/ui/error-state";

import { useDeveloperWorkspaceStore } from "../../store/developer-workspace-store";
import { PreviewToolbar } from "./PreviewToolbar";
import type { PreviewDevice } from "../../types/preview.types";

const frameWidth: Record<PreviewDevice, string> = {
  desktop: "100%",
  tablet: "768px",
  mobile: "390px",
};

/**
 * UzCode AI — LivePreview
 * NOT a real iframe — this sprint only reserves the visual slot and
 * demonstrates the loading/error/ready states a future sprint will
 * actually drive from build/dev-server status.
 */
export function LivePreview({ state = "ready" }: { state?: "ready" | "loading" | "error" }) {
  const device = useDeveloperWorkspaceStore((s) => s.activePreviewDevice);

  return (
    <div className="flex h-full flex-col">
      <PreviewToolbar />
      <div className="flex flex-1 items-center justify-center overflow-auto bg-muted/30 p-4">
        <div
          style={{ width: frameWidth[device], maxWidth: "100%" }}
          className="h-full overflow-hidden rounded-card border border-border bg-card shadow-card"
        >
          {state === "loading" ? (
            <LoadingState label="Starting dev server…" />
          ) : state === "error" ? (
            <ErrorState title="Preview unavailable" description="No dev server connection this sprint." />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-2 text-center text-muted-foreground">
              <MonitorPlay className="h-8 w-8" aria-hidden="true" />
              <p className="text-sm">Live Preview</p>
              <p className="max-w-[220px] text-xs">Real preview rendering ships in a later sprint.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
