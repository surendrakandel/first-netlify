import { freightClass } from '$src/types/commodity';

interface freightClassType {
  value: number;
  name: string;
  stringValue: string;
}
export function mapToFreightType(freightClassKey: string): freightClassType {
  const value: number = freightClass[freightClassKey as keyof typeof freightClass];
  const name: string = 'Class ' + freightClassKey.slice(5);
  const stringValue: string = freightClassKey;

  return {
    value,
    name,
    stringValue
  };
}

const allFreightClass = Object.keys(freightClass).filter((key) => isNaN(Number(key)));

export const allFreightClasses: freightClassType[] = allFreightClass.map(mapToFreightType);

export function getFreightClassString(value: number): string {
  const key = Object.keys(freightClass).find((k) => freightClass[k] === value);
  if (key && key !== 'UNRECOGNIZED') {
    const classNumber = key.replace('class', '');
    return `Class ${classNumber}`;
  }
  return '';
}
