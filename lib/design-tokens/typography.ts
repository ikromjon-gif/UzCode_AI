/**
 * UzCode AI — Typography Tokens
 *
 * Practical (non-modular-ratio) type scale, per approved refinement:
 * 12 / 14 / 16 / 18 / 20 / 24 / 30 / 36 / 48 / 60 / 72.
 * Line-heights are paired per size (tighter for large display sizes,
 * looser for small body/caption sizes — standard practice, not from
 * a formula) so components never need to specify line-height manually.
 */
export const fontSize = {
  xs: { size: "12px", lineHeight: "16px" },
  sm: { size: "14px", lineHeight: "20px" },
  base: { size: "16px", lineHeight: "24px" },
  lg: { size: "18px", lineHeight: "28px" },
  xl: { size: "20px", lineHeight: "28px" },
  "2xl": { size: "24px", lineHeight: "32px" },
  "3xl": { size: "30px", lineHeight: "36px" },
  "4xl": { size: "36px", lineHeight: "40px" },
  "5xl": { size: "48px", lineHeight: "52px" },
  "6xl": { size: "60px", lineHeight: "64px" },
  "7xl": { size: "72px", lineHeight: "76px" },
} as const;

export type FontSizeToken = keyof typeof fontSize;

export const fontWeight = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
} as const;

export type FontWeightToken = keyof typeof fontWeight;

export const fontFamily = {
  sans: "var(--font-inter)",
  mono: "var(--font-jetbrains-mono)",
} as const;

/**
 * Heading system — maps semantic heading levels to a fixed
 * size/weight/lineHeight combination, so h1–h6 stay visually
 * consistent everywhere instead of being assembled ad hoc.
 */
export const heading = {
  h1: { size: fontSize["5xl"], weight: fontWeight.extrabold },
  h2: { size: fontSize["4xl"], weight: fontWeight.bold },
  h3: { size: fontSize["3xl"], weight: fontWeight.bold },
  h4: { size: fontSize["2xl"], weight: fontWeight.semibold },
  h5: { size: fontSize.xl, weight: fontWeight.semibold },
  h6: { size: fontSize.lg, weight: fontWeight.semibold },
} as const;

export const bodyText = {
  default: { size: fontSize.base, weight: fontWeight.regular },
  emphasis: { size: fontSize.base, weight: fontWeight.medium },
  small: { size: fontSize.sm, weight: fontWeight.regular },
} as const;

export const caption = {
  default: { size: fontSize.xs, weight: fontWeight.medium },
} as const;

export const codeText = {
  default: { size: fontSize.sm, weight: fontWeight.regular, family: fontFamily.mono },
} as const;
