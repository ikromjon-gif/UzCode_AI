"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark, oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

/**
 * UzCode AI — CodeHighlighter
 * The actual react-syntax-highlighter usage, isolated into its own
 * module so CodeBlock.tsx can load it via next/dynamic — same
 * "isolate the heavy dependency" pattern as Sprint 6's MonacoEditor.
 * No other file should import react-syntax-highlighter directly.
 */
export default function CodeHighlighter({
  language,
  code,
  isDark,
}: {
  language: string;
  code: string;
  isDark: boolean;
}) {
  return (
    <SyntaxHighlighter
      language={language || "text"}
      style={isDark ? oneDark : oneLight}
      customStyle={{ margin: 0, borderRadius: 0, fontSize: "13px", padding: "12px" }}
    >
      {code}
    </SyntaxHighlighter>
  );
}
