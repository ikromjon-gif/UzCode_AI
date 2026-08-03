/**
 * UzCode AI — Supported languages (Sprint 6 scope).
 * All 11 ship with Monaco's built-in Monarch tokenizers — no
 * language-server packages needed for syntax highlighting/basic
 * editing. Real language-server intelligence (autocomplete,
 * diagnostics) is explicitly out of scope this sprint.
 */
export interface SupportedLanguage {
  id: string; // Monaco language id
  label: string;
  extensions: string[];
}

export const supportedLanguages: SupportedLanguage[] = [
  { id: "typescript", label: "TypeScript", extensions: ["ts", "tsx"] },
  { id: "javascript", label: "JavaScript", extensions: ["js", "jsx"] },
  { id: "json", label: "JSON", extensions: ["json"] },
  { id: "html", label: "HTML", extensions: ["html", "htm"] },
  { id: "css", label: "CSS", extensions: ["css"] },
  { id: "markdown", label: "Markdown", extensions: ["md", "mdx"] },
  { id: "python", label: "Python", extensions: ["py"] },
  { id: "cpp", label: "C++", extensions: ["cpp", "cc", "h", "hpp"] },
  { id: "java", label: "Java", extensions: ["java"] },
  { id: "go", label: "Go", extensions: ["go"] },
  { id: "rust", label: "Rust", extensions: ["rs"] },
];

const extensionToLanguageId: Record<string, string> = supportedLanguages.reduce(
  (map, lang) => {
    for (const ext of lang.extensions) map[ext] = lang.id;
    return map;
  },
  {} as Record<string, string>,
);

/** Infers a Monaco language id from a filename. Falls back to "plaintext". */
export function getLanguageFromFilename(filename: string): string {
  const ext = filename.split(".").pop()?.toLowerCase();
  return (ext && extensionToLanguageId[ext]) || "plaintext";
}

export function getLanguageLabel(languageId: string): string {
  return supportedLanguages.find((l) => l.id === languageId)?.label ?? "Plain Text";
}
