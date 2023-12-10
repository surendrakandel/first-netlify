import type { commodity } from '$src/types/commodity';
import { isEnvDev } from '../config';

export function getNewCommodity(position: number): commodity {
  if(isEnvDev()){
    return {
      density: 0,
      length: 48,
      width: 40,
      height: 65,
      weight: 800,
      dimensionDisplay: '',
      packageType: 1,
      quantity: 1,
      freightClass: 5,
      instructions: '',
      index: position,
      description: 'novelties',
      dimensionUOM: {
        INCH: true,
        CM: false
      },
      weightUOM: {
        LB: true,
        KG: false
      },
      commodityServices: [0]
      }
  }
  const commodity: commodity = {
    density: 0,
    length: undefined,
    width: undefined,
    height: undefined,
    weight: undefined,
    dimensionDisplay: '',
    packageType: 0,
    quantity: undefined,
    freightClass: 0,
    instructions: '',
    index: position,
    description: '',
    dimensionUOM: {
      INCH: true,
      CM: false
    },
    weightUOM: {
      LB: true,
      KG: false
    },
    commodityServices: [0]
  };
  return commodity;
}
