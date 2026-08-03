import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";

import { cn } from "@/lib/utils";

import { CodeBlock } from "./CodeBlock";
import { MermaidPlaceholder } from "./MermaidPlaceholder";

/**
 * UzCode AI — MarkdownRenderer
 * react-markdown + remark-gfm (tables, task lists, strikethrough).
 * Block code (```lang) renders via CodeBlock; a ```mermaid fence
 * renders MermaidPlaceholder instead. Inline `code` gets its own
 * lighter style. Every color/spacing class below traces to a design
 * token, nothing hardcoded.
 */
const components: Components = {
  code({ className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || "");
    const isBlock = Boolean(match);
    const code = String(children).replace(/\n$/, "");

    if (!isBlock) {
      return (
        <code className="rounded-[calc(var(--radius-input)/3)] bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-foreground" {...props}>
          {children}
        </code>
      );
    }

    const language = match?.[1] ?? "";
    if (language === "mermaid") return <MermaidPlaceholder />;
    return <CodeBlock language={language} code={code} />;
  },
  pre({ children }) {
    // CodeBlock already renders its own <pre>-equivalent wrapper; avoid double-wrapping.
    return <>{children}</>;
  },
  table({ className, ...props }) {
    return (
      <div className="my-2 overflow-auto rounded-card border border-border">
        <table className={cn("w-full text-sm", className)} {...props} />
      </div>
    );
  },
  thead({ className, ...props }) {
    return <thead className={cn("bg-muted/40 text-left text-xs text-muted-foreground", className)} {...props} />;
  },
  th({ className, ...props }) {
    return <th className={cn("border-b border-border px-3 py-2 font-medium", className)} {...props} />;
  },
  td({ className, ...props }) {
    return <td className={cn("border-b border-border px-3 py-2", className)} {...props} />;
  },
  ul({ className, ...props }) {
    return <ul className={cn("my-2 list-disc space-y-1 pl-5", className)} {...props} />;
  },
  ol({ className, ...props }) {
    return <ol className={cn("my-2 list-decimal space-y-1 pl-5", className)} {...props} />;
  },
  a({ className, ...props }) {
    return <a className={cn("text-accent underline underline-offset-2", className)} {...props} />;
  },
  p({ className, ...props }) {
    return <p className={cn("leading-relaxed", className)} {...props} />;
  },
};

export function MarkdownRenderer({ content }: { content: string }) {
  return (
    <div className="flex flex-col gap-2 text-sm text-foreground">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
