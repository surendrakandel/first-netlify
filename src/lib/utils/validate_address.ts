import type { address } from '$src/types/address';
export function validateAddress(quoteAddress: address, googleAddress: address): boolean {
  const isnum = /^\d+$/.test(googleAddress.zipCode);
  if (
    (!isnum && quoteAddress.zipCode !== googleAddress.zipCode) ||
    quoteAddress.zipCode.toLowerCase().trim().length != 5
  ) {
    return false;
  }
  if (
    quoteAddress.city.toLowerCase().trim() === googleAddress.city.toLowerCase().trim() &&
    quoteAddress.state.toLowerCase().trim() === googleAddress.state.toLowerCase().trim()
  ) {
    return true;
  }
}
