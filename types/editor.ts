/**
 * UzCode AI — Shared EditorTab type.
 * Originally declared in features/workspace-explorer (Sprint 5);
 * promoted here in Sprint 6 since both that feature's "Open Editors"
 * nav section and this sprint's real Editor Tabs need the identical
 * shape — duplicating it would violate DRY.
 */
export interface EditorTab {
  id: string;
  label: string;
  path: string;
  language: string;
  isDirty?: boolean;
}
