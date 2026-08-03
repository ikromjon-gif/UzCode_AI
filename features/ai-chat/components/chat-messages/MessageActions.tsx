"use client";

import * as React from "react";
import { Copy, Check, RotateCcw, ThumbsUp, ThumbsDown } from "lucide-react";

import { IconButton } from "@/components/ui/icon-button";
import { cn } from "@/lib/utils";

/**
 * UzCode AI — MessageActions
 * Copy is real (clipboard write). Regenerate/Like/Dislike are
 * placeholders — no regeneration logic, no persisted reaction state
 * beyond the local toggle visual (nothing is sent anywhere).
 */
export function MessageActions({
  content,
  showAssistantActions = false,
  liked,
  disliked,
  className,
}: {
  content: string;
  showAssistantActions?: boolean;
  liked?: boolean;
  disliked?: boolean;
  className?: string;
}) {
  const [copied, setCopied] = React.useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className={cn("flex items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100", className)}>
      <IconButton
        aria-label={copied ? "Copied" : "Copy message"}
        variant="ghost"
        size="sm"
        className="h-6 w-6"
        icon={copied ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />}
        onClick={handleCopy}
      />
      {showAssistantActions ? (
        <>
          <IconButton aria-label="Regenerate response" variant="ghost" size="sm" className="h-6 w-6" icon={<RotateCcw className="h-3.5 w-3.5" />} />
          <IconButton
            aria-label="Good response"
            variant={liked ? "primary" : "ghost"}
            size="sm"
            className="h-6 w-6"
            icon={<ThumbsUp className="h-3.5 w-3.5" />}
          />
          <IconButton
            aria-label="Bad response"
            variant={disliked ? "danger" : "ghost"}
            size="sm"
            className="h-6 w-6"
            icon={<ThumbsDown className="h-3.5 w-3.5" />}
          />
        </>
      ) : null}
    </div>
  );
}
