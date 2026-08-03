"use client";

import { ChevronDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

import { useChatStore } from "../../store/chat-store";
import { aiModels } from "../../constants/models";

/**
 * UzCode AI — ModelSelector
 * Writes to chat-store's `selectedModelId` (real UI state — the
 * selection visibly changes) but there is no API client behind any
 * of these 6 entries and no actual model-switching behavior.
 */
export function ModelSelector() {
  const selectedModelId = useChatStore((s) => s.selectedModelId);
  const setSelectedModel = useChatStore((s) => s.setSelectedModel);
  const selected = aiModels.find((m) => m.id === selectedModelId) ?? aiModels[0]!;
  const SelectedIcon = selected.icon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="flex items-center gap-1.5 rounded-button px-2 py-1 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-ring"
        >
          <SelectedIcon className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
          {selected.label}
          <ChevronDown className="h-3 w-3 text-muted-foreground" aria-hidden="true" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuLabel>Model</DropdownMenuLabel>
        {aiModels.map((model) => {
          const Icon = model.icon;
          return (
            <DropdownMenuItem key={model.id} onSelect={() => setSelectedModel(model.id)}>
              <Icon className="h-4 w-4" aria-hidden="true" />
              <span className="flex-1">{model.label}</span>
              <span className="text-xs text-muted-foreground">{model.provider}</span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
