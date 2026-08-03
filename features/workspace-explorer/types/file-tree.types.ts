/**
 * UzCode AI — File tree node shape.
 * `id` is a stable identifier (not necessarily the path) so selection/
 * expansion state in the Zustand store can key off it even before
 * real filesystem paths exist.
 */
export interface TreeNode {
  id: string;
  name: string;
  type: "file" | "folder";
  path: string;
  children?: TreeNode[];
}
