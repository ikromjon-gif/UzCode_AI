import type { TreeNode } from "../types/file-tree.types";

/**
 * UzCode AI — Sample file tree.
 * Static demo data only — NOT fetched from any filesystem or API.
 * Exists purely so ExplorerPanel has something to render; a real
 * project's tree replaces this entirely once there's a backend
 * (Sprint 12, File Explorer).
 */
export const mockFileTree: TreeNode[] = [
  {
    id: "app",
    name: "app",
    type: "folder",
    path: "/app",
    children: [
      { id: "layout", name: "layout.tsx", type: "file", path: "/app/layout.tsx" },
      { id: "page", name: "page.tsx", type: "file", path: "/app/page.tsx" },
      {
        id: "app-group",
        name: "(app)",
        type: "folder",
        path: "/app/(app)",
        children: [
          { id: "app-layout", name: "layout.tsx", type: "file", path: "/app/(app)/layout.tsx" },
        ],
      },
    ],
  },
  {
    id: "components",
    name: "components",
    type: "folder",
    path: "/components",
    children: [{ id: "ui", name: "ui", type: "folder", path: "/components/ui", children: [] }],
  },
  {
    id: "features",
    name: "features",
    type: "folder",
    path: "/features",
    children: [],
  },
  { id: "package-json", name: "package.json", type: "file", path: "/package.json" },
  { id: "readme", name: "README.md", type: "file", path: "/README.md" },
];
