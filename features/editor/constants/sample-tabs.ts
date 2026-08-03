import type { EditorTab } from "@/types/editor";

/**
 * UzCode AI — Sample open tabs + content.
 * Static demo data (same spirit as Sprint 5's mockFileTree) so the
 * multi-language, multi-tab Monaco setup is actually visible without
 * building real "open file from Explorer" wiring, which is out of
 * scope this sprint.
 */
export const sampleTabs: EditorTab[] = [
  { id: "sample-welcome", label: "welcome.md", path: "/welcome.md", language: "markdown" },
  { id: "sample-example-ts", label: "example.ts", path: "/example.ts", language: "typescript" },
];

export const sampleTabContent: Record<string, string> = {
  "sample-welcome": [
    "# Welcome to UzCode AI",
    "",
    "This is a **sample** file demonstrating Markdown support.",
    "",
    "- Monaco Editor is now integrated",
    "- Syntax highlighting is theme-aware (try switching light/dark)",
    "- 11 languages are supported out of the box",
  ].join("\n"),
  "sample-example-ts": [
    "// Sample TypeScript file — syntax highlighting demo only.",
    "interface Project {",
    "  id: string;",
    "  name: string;",
    "  createdAt: Date;",
    "}",
    "",
    "function greet(project: Project): string {",
    "  return `Welcome to ${project.name}`;",
    "}",
  ].join("\n"),
};
