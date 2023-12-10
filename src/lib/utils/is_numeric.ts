export function isNumeric(str: string): boolean {
  if (typeof str !== 'string') return false;
  return !isNaN(parseInt(str)) && !isNaN(parseFloat(str));
}
