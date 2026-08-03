"use client";

import { Monitor, Tablet, Smartphone } from "lucide-react";

import { cn } from "@/lib/utils";
import { IconButton } from "@/components/ui/icon-button";

import { useDeveloperWorkspaceStore } from "../../store/developer-workspace-store";
import type { PreviewDevice } from "../../types/preview.types";

const devices: { id: PreviewDevice; label: string; icon: typeof Monitor }[] = [
  { id: "desktop", label: "Desktop", icon: Monitor },
  { id: "tablet", label: "Tablet", icon: Tablet },
  { id: "mobile", label: "Mobile", icon: Smartphone },
];

/** UzCode AI — DeviceSelector. Real UI state — changes LivePreview's frame width. */
export function DeviceSelector() {
  const active = useDeveloperWorkspaceStore((s) => s.activePreviewDevice);
  const setDevice = useDeveloperWorkspaceStore((s) => s.setPreviewDevice);

  return (
    <div className="flex items-center gap-0.5 rounded-button bg-muted p-0.5">
      {devices.map((device) => {
        const Icon = device.icon;
        return (
          <IconButton
            key={device.id}
            aria-label={device.label}
            variant="ghost"
            size="sm"
            className={cn("h-6 w-6", active === device.id && "bg-card shadow-resting")}
            icon={<Icon className="h-3.5 w-3.5" />}
            onClick={() => setDevice(device.id)}
          />
        );
      })}
    </div>
  );
}
