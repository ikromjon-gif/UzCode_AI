"use client";

import { ArrowLeft, ArrowRight, RotateCw, ExternalLink, ZoomIn, ZoomOut } from "lucide-react";

import { IconButton } from "@/components/ui/icon-button";

import { DeviceSelector } from "./DeviceSelector";

/**
 * UzCode AI — PreviewToolbar
 * Only DeviceSelector is functional. Back/Forward/Refresh/Zoom/Open
 * External are placeholders — there's no real navigable frame behind
 * any of them yet.
 */
export function PreviewToolbar() {
  return (
    <div className="flex h-9 items-center gap-1 border-b border-border px-2">
      <IconButton aria-label="Back" variant="ghost" size="sm" className="h-6 w-6" icon={<ArrowLeft className="h-3.5 w-3.5" />} disabled />
      <IconButton aria-label="Forward" variant="ghost" size="sm" className="h-6 w-6" icon={<ArrowRight className="h-3.5 w-3.5" />} disabled />
      <IconButton aria-label="Refresh preview" variant="ghost" size="sm" className="h-6 w-6" icon={<RotateCw className="h-3.5 w-3.5" />} />

      {/* Address Placeholder */}
      <div className="mx-1 flex h-6 flex-1 items-center rounded-input border border-input bg-muted/40 px-2 text-xs text-muted-foreground">
        localhost:3000
      </div>

      <DeviceSelector />
      <IconButton aria-label="Zoom out" variant="ghost" size="sm" className="h-6 w-6" icon={<ZoomOut className="h-3.5 w-3.5" />} />
      <IconButton aria-label="Zoom in" variant="ghost" size="sm" className="h-6 w-6" icon={<ZoomIn className="h-3.5 w-3.5" />} />
      <IconButton aria-label="Open in new tab" variant="ghost" size="sm" className="h-6 w-6" icon={<ExternalLink className="h-3.5 w-3.5" />} />
    </div>
  );
}
