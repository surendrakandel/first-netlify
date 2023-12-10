import { packageType } from '$src/types/commodity';

type PackageType =
  | 'unknownPackageType'
  | 'pallets48x40'
  | 'pallets48x48'
  | 'bags'
  | 'bales'
  | 'boxes'
  | 'buckets'
  | 'bundles'
  | 'cans'
  | 'cartons'
  | 'cases'
  | 'coils'
  | 'crates'
  | 'cylinders'
  | 'drums'
  | 'pails'
  | 'reels'
  | 'rolls'
  | 'totes'
  | 'tubes'
  | 'units'
  | 'UNRECOGNIZED';

interface package_type {
  value: number;
  name: string;
  stringValue: string;
}

function mapToPackageType(packageType: PackageType): package_type {
  let value: number;
  let name: string;

  switch (packageType) {
    case 'unknownPackageType':
      value = 0;
      name = 'Unknown Package Type';
      break;
    case 'pallets48x40':
      value = 1;
      name = 'Pallets 48x40';
      break;
    case 'pallets48x48':
      value = 2;
      name = 'Pallets 48x48';
      break;
    case 'bags':
      value = 3;
      name = 'Bags';
      break;
    case 'bales':
      value = 4;
      name = 'Bales';
      break;
    case 'boxes':
      value = 5;
      name = 'Boxes';
      break;
    case 'buckets':
      value = 6;
      name = 'Buckets';
      break;
    case 'bundles':
      value = 7;
      name = 'Bundles';
      break;
    case 'cans':
      value = 8;
      name = 'Cans';
      break;
    case 'cartons':
      value = 9;
      name = 'Cartons';
      break;
    case 'cases':
      value = 10;
      name = 'Cases';
      break;
    case 'coils':
      value = 11;
      name = 'Coils';
      break;
    case 'crates':
      value = 12;
      name = 'Crates';
      break;
    case 'cylinders':
      value = 13;
      name = 'Cylinders';
      break;
    case 'drums':
      value = 14;
      name = 'Drums';
      break;
    case 'pails':
      value = 15;
      name = 'Pails';
      break;
    case 'reels':
      value = 16;
      name = 'Reels';
      break;
    case 'rolls':
      value = 17;
      name = 'Rolls';
      break;
    case 'totes':
      value = 18;
      name = 'Totes';
      break;
    case 'tubes':
      value = 19;
      name = 'Tubes';
      break;
    case 'units':
      value = 20;
      name = 'Units';
      break;
    case 'UNRECOGNIZED':
    default:
      value = -1;
      name = 'Unrecognized';
      break;
  }

  return {
    value,
    name,
    stringValue: packageType
  };
}

const packageTypes = Object.keys(packageType).filter((key) => isNaN(Number(key)));

export const allPackageTypes: package_type[] = packageTypes.map(mapToPackageType);
