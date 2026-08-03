import { File, FileCode, FileJson, FileText, FileType } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * UzCode AI — Shared file-extension → icon lookup.
 * Extracted from Sprint 5's TreeIcon so Editor Tabs (Sprint 6) uses
 * the exact same mapping instead of a second copy — single source of
 * truth for "what does this file type look like" across the app.
 * Extended to cover all 11 languages Monaco supports this sprint.
 */
const extensionIconMap: Record<string, LucideIcon> = {
  ts: FileCode,
  tsx: FileCode,
  js: FileCode,
  jsx: FileCode,
  json: FileJson,
  md: FileText,
  html: FileCode,
  css: FileCode,
  py: FileCode,
  cpp: FileCode,
  cc: FileCode,
  h: FileCode,
  hpp: FileCode,
  java: FileCode,
  go: FileCode,
  rs: FileCode,
  txt: FileType,
};

export function getFileIcon(name: string): LucideIcon {
  const ext = name.split(".").pop()?.toLowerCase();
  return (ext && extensionIconMap[ext]) || File;
}
