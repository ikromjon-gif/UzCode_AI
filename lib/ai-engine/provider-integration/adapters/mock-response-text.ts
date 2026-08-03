/**
 * Shared mock reply text — one place so all 8 adapters' mocks stay
 * consistent instead of each inventing its own copy.
 */
export function getMockReplyText(providerLabel: string): string {
  return `[Mock response from ${providerLabel}] No real API call was made — this is static placeholder text from the Provider Integration Foundation.`;
}
