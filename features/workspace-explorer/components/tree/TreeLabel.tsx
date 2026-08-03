import { treeLabelBase } from "./tree.styles";

/** UzCode AI — TreeLabel. Truncated node name. */
export function TreeLabel({ children }: { children: string }) {
  return <span className={treeLabelBase}>{children}</span>;
}
