"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { Check, Copy } from "lucide-react";

import { IconButton } from "@/components/ui/icon-button";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * UzCode AI — CodeBlock
 * The header bar (language label + copy button) stays eager — it's
 * cheap. The actual highlighter (react-syntax-highlighter + two full
 * Prism themes) is lazy-loaded via next/dynamic, same pattern as
 * Sprint 6's MonacoEditor, so it no longer ships in the initial
 * /ai-chat bundle.
 */
const CodeHighlighter = dynamic(() => import("./CodeHighlighter"), {
  ssr: false,
  loading: () => <Skeleton className="h-24 w-full" radius="card" />,
});

export function CodeBlock({ language, code }: { language: string; code: string }) {
  const { resolvedTheme } = useTheme();
  const [copied, setCopied] = React.useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="group relative overflow-hidden rounded-card border border-border">
      <div className="flex items-center justify-between border-b border-border bg-muted/40 px-3 py-1.5">
        <span className="text-xs text-muted-foreground">{language || "text"}</span>
        <IconButton
          aria-label={copied ? "Copied" : "Copy code"}
          variant="ghost"
          size="sm"
          className="h-6 w-6"
          icon={copied ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />}
          onClick={handleCopy}
        />
      </div>
      <CodeHighlighter language={language} code={code} isDark={resolvedTheme === "dark"} />
    </div>
  );
}
