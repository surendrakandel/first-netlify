export function areAllElementsEmpty(obj: any): boolean {
  return Object.values(obj).every((value) => {
    if (value === null || value === undefined) {
      return true;
    } else if (typeof value === 'string') {
      return value.trim() === '';
    } else if (typeof value === 'object') {
      return areAllElementsEmpty({ obj: value });
    } else {
      return false;
    }
  });
}
