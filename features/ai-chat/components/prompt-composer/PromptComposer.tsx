"use client";

import * as React from "react";
import { Paperclip, AtSign, Square, SendHorizontal } from "lucide-react";

import { IconButton } from "@/components/ui/icon-button";
import { Button } from "@/components/ui/button";

import { useChatStore } from "../../store/chat-store";
import { ModelSelector } from "../model-selector";

const MAX_CHARS = 4000;
const MAX_TEXTAREA_HEIGHT = 200;

/**
 * UzCode AI — PromptComposer
 * Only Send (and the character counter) are functional. Attach,
 * Context, and Stop are inert placeholders — no upload, no context
 * attachment, no in-flight request to stop (nothing is ever "in
 * flight" this sprint). Token counter shows a rough word-based
 * estimate labeled as approximate, not a real tokenizer.
 */
export function PromptComposer() {
  const composerValue = useChatStore((s) => s.composerValue);
  const setComposerValue = useChatStore((s) => s.setComposerValue);
  const sendMessage = useChatStore((s) => s.sendMessage);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, MAX_TEXTAREA_HEIGHT)}px`;
  }, [composerValue]);

  function handleSend() {
    if (!composerValue.trim()) return;
    sendMessage(composerValue);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  const charCount = composerValue.length;
  const approxTokens = Math.ceil(composerValue.split(/\s+/).filter(Boolean).length * 1.3);

  return (
    <div className="flex flex-col gap-2 border-t border-border p-3">
      <div className="flex items-center gap-1">
        <IconButton aria-label="Attach file" variant="ghost" size="sm" icon={<Paperclip className="h-3.5 w-3.5" />} className="h-7 w-7" />
        <IconButton aria-label="Add context" variant="ghost" size="sm" icon={<AtSign className="h-3.5 w-3.5" />} className="h-7 w-7" />
        <ModelSelector />
      </div>

      <textarea
        ref={textareaRef}
        value={composerValue}
        onChange={(e) => setComposerValue(e.target.value.slice(0, MAX_CHARS))}
        onKeyDown={handleKeyDown}
        placeholder="Ask UzCode AI anything… (Enter to send, Shift+Enter for a new line)"
        rows={1}
        aria-label="Message UzCode AI"
        className="max-h-[200px] min-h-[40px] w-full resize-none border-0 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
      />

      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">
          {charCount}/{MAX_CHARS} · ~{approxTokens} tokens (approx.)
        </span>
        <div className="flex items-center gap-2">
          <IconButton aria-label="Stop generating" variant="outline" size="sm" icon={<Square className="h-3 w-3" />} className="hidden" />
          <Button
            variant="primary"
            size="sm"
            disabled={!composerValue.trim()}
            onClick={handleSend}
            rightIcon={<SendHorizontal className="h-3.5 w-3.5" aria-hidden="true" />}
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}
