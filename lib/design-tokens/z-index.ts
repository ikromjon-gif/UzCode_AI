/**
 * UzCode AI — Z-Index Tokens
 * Named stacking-context scale so components never hardcode a raw
 * z-index number. Ordered lowest → highest; gaps of 10 are left
 * intentionally so a future layer can be inserted without renumbering.
 */
export const zIndex = {
  base: 0,
  dropdown: 20,
  sticky: 30,
  modalBackdrop: 40,
  modal: 50,
  popover: 60,
  tooltip: 70,
  toast: 80,
  max: 9999,
} as const;

export type ZIndexToken = keyof typeof zIndex;
