/**
 * UzCode AI — Border Width Tokens
 * `hairline` supplements Tailwind's default integer border scale
 * (0/1/2/4px) for high-density-display 1px-equivalent lines.
 */
export const borderWidth = {
  hairline: "0.5px",
  default: "1px",
  thick: "2px",
  heavy: "4px",
} as const;

export type BorderWidthToken = keyof typeof borderWidth;
