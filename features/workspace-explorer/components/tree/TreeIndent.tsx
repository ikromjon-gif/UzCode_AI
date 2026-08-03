import { treeIndentUnit } from "./tree.styles";

/** UzCode AI — TreeIndent. Purely visual depth spacer — one instance per nesting level. */
export function TreeIndent({ depth }: { depth: number }) {
  return <span aria-hidden="true" style={{ width: depth * treeIndentUnit }} className="shrink-0" />;
}
