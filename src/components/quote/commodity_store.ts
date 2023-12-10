import { browser } from '$app/environment';
import { getNewCommodity } from '$src/lib/utils/newCommodity';
import type { commodity } from '$src/types/commodity';
import toast from 'svelte-french-toast';
import { writable, type Writable, get } from 'svelte/store';
import { mapToFreightType } from '$src/lib/utils/freight_class';
import type { errorInfo } from '$src/lib/custom_types';
function localStorageCommodity(): commodity[] {
  if (browser) {
    const localCommoditiesStr = localStorage.getItem('currentCommodities') || '[]';
    const commodities: commodity[] = JSON.parse(localCommoditiesStr);
    if (commodities?.length > 0) {
      return commodities;
    }
    return [getNewCommodity(0)];
  } else {
    return [getNewCommodity(0)];
  }
}
export interface quoteItemErrors {
  description: errorInfo;
  quantity: errorInfo;
  weight: errorInfo;
  length: errorInfo;
  width: errorInfo;
  height: errorInfo;
  packageType: errorInfo;
  freightClass: errorInfo;
  weightUOM: errorInfo;
  dimensionUOM: errorInfo;
}
export interface commodityWorker {
  commodityStore: Writable<commodity[]>;
}
function initCommodityWorker(): commodityWorker {
  let commodityStore: Writable<commodity[]> = writable([getNewCommodity(0)]);
    if (browser) {
      let isEdit = localStorage.getItem('isEdit') || false;
      let backupCommodity = [getNewCommodity(0)];
      if (isEdit && isEdit != "" || isEdit != "false" && isEdit== "true") {
        backupCommodity = localStorageCommodity();
        commodityStore.set(backupCommodity);
      }
      commodityStore.subscribe((val) => {
       localStorage.setItem('currentCommodities', JSON.stringify(val));
    });
  };
  return {
    commodityStore
  };
}
export const { commodityStore } = initCommodityWorker();

export function newItemErrors() {
  const itemErr: quoteItemErrors = {
    description: {
      valid: true,
      message: 'shipment description is invalid'
    },
    quantity: {
      valid: true,
      message: 'shipment quantity is invalid'
    },
    weight: {
      valid: true,
      message: 'weight is invalid'
    },
    length: {
      valid: true,
      message: 'length is invalid'
    },
    width: {
      valid: true,
      message: 'width is invalid'
    },
    height: {
      valid: true,
      message: 'height is invalid'
    },
    packageType: {
      valid: true,
      message: 'package type is invalid'
    },
    freightClass: {
      valid: true,
      message: 'freight class is invalid'
    },
    weightUOM: {
      valid: true,
      message: 'please provide weight in Lbs'
    },
    dimensionUOM: {
      valid: true,
      message: 'please provide dimensions in Inches'
    }
  };
  return itemErr;
}

export function validateDescription(event: any, errors: Writable<quoteItemErrors>) {
  const value = event.target.value;
  let valid = false;
  if (value) {
    valid = value.length > 3;
  }
  errors.update((errors) => {
    errors.description.valid = valid;
    return errors;
  });
}
export function validatePackageType(event: any, errors: Writable<quoteItemErrors>) {
  const value = event.target.value;
  let valid = false;
  if (value) {
    const intValue = parseInt(value);
    valid = !(intValue > 20 || intValue < 1);
  }
  errors.update((errors) => {
    errors.packageType.valid = valid;
    return errors;
  });
}
export function initItemErrorData(): Writable<quoteItemErrors> {
  const quoteItemErrors: Writable<quoteItemErrors> = writable(newItemErrors());
  return quoteItemErrors;
}
export function validateQuantity(event: any, errors: Writable<quoteItemErrors>) {
  const value = event.target.value;
  let valid = false;
  if (value) {
    const intValue = parseInt(value);
    if (intValue > 6 && intValue < 30) {
      toast.success(
        'this quantity qualifies for a VTL quote. Please call 1-800-800-8000 for a best rate.',
        {
          className: '',
          duration: 10000
        }
      );
    }
    valid = !(intValue > 6 || intValue < 1);
  }
  errors.update((errors) => {
    errors.quantity.valid = valid;
    return errors;
  });
}
export function validateLength(event: any, errors: Writable<quoteItemErrors>) {
  const value = event.target.value;
  let valid = false;
  if (value) {
    const intValue = parseInt(value);
    valid = !(intValue > 80 || intValue < 10);
  }
  errors.update((errors) => {
    errors.length.valid = valid;
    return errors;
  });
}
export function validateWidth(event: any, errors: Writable<quoteItemErrors>) {
  const value = event.target.value;
  let valid = false;
  if (value) {
    const intValue = parseInt(value);
    valid = !(intValue > 80 || intValue < 10);
  }
  errors.update((errors) => {
    errors.width.valid = valid;
    return errors;
  });
}
export function validateHeight(event: any, errors: Writable<quoteItemErrors>) {
  const value = event.target.value;
  let valid = false;
  if (value) {
    const intValue = parseInt(value);
    valid = !(intValue > 80 || intValue < 10);
  }
  errors.update((errors) => {
    errors.height.valid = valid;
    return errors;
  });
}
export function validateWeight(event: any, errors: Writable<quoteItemErrors>) {
  const value = event.target.value;
  let valid = false;
  if (value) {
    const intValue = parseInt(value);
    valid = !(intValue > 10000 || intValue < 50);
  }
  errors.update((errors) => {
    errors.weight.valid = valid;
    return errors;
  });
}
export function calculateFreightClass(index: number, errors: Writable<quoteItemErrors>) {
  const commodityStoreData = get(commodityStore);
  const commodity = commodityStoreData[index];
  if (commodityStoreData && commodity) {
    if (
      !commodity?.length ||
      !commodity?.width ||
      !commodity?.height ||
      !commodity?.weight ||
      !commodity?.quantity
    ) {
      errors.update((errors) => {
        errors.freightClass.valid = false;
        return errors;
      });
      return;
    }
    let density = 0;
    if (
      commodity?.length &&
      commodity?.width &&
      commodity?.height &&
      commodity?.weight &&
      commodity?.quantity
    ) {
      if (
        commodity.length <= 0 ||
        commodity.width <= 0 ||
        commodity.height <= 0 ||
        commodity.weight <= 0
      ) {
        errors.update((errors:any) => {
          errors[index].freightClass.valid = false;
          return errors;
        });
        return;
      }
      let volume = (commodity?.length * commodity?.width * commodity?.height) / 1728;
      volume = volume * commodity.quantity;
      density = parseFloat((commodity.weight / volume).toFixed(2));
    }
    const currentFreightClass = {
      upper: 0,
      lower: 0,
      currentClass: 0,
      nextClass: 0
    };
    if (density >= 1 && density <= 2) {
      currentFreightClass.lower = 1;
      currentFreightClass.upper = 2;
      currentFreightClass.currentClass = 400;
      currentFreightClass.nextClass = 300;
    }
    if (density >= 2.000001 && density <= 3) {
      currentFreightClass.lower = 2;
      currentFreightClass.upper = 3;
      currentFreightClass.currentClass = 300;
      currentFreightClass.nextClass = 250;
    }
    if (density >= 3.000001 && density <= 4) {
      currentFreightClass.lower = 3;
      currentFreightClass.upper = 4;
      currentFreightClass.currentClass = 250;
      currentFreightClass.nextClass = 200;
    }
    if (density >= 4.000001 && density <= 5) {
      currentFreightClass.lower = 4;
      currentFreightClass.upper = 5;
      currentFreightClass.currentClass = 200;
      currentFreightClass.nextClass = 175;
    }
    if (density >= 5.000001 && density <= 6) {
      currentFreightClass.lower = 5;
      currentFreightClass.upper = 6;
      currentFreightClass.currentClass = 175;
      currentFreightClass.nextClass = 150;
    }
    if (density >= 6.000001 && density <= 7) {
      currentFreightClass.lower = 6;
      currentFreightClass.upper = 7;
      currentFreightClass.currentClass = 150;
      currentFreightClass.nextClass = 125;
    }
    if (density >= 7.000001 && density <= 8) {
      currentFreightClass.lower = 7;
      currentFreightClass.upper = 8;
      currentFreightClass.currentClass = 125;
      currentFreightClass.nextClass = 110;
    }
    if (density >= 8.000001 && density <= 9) {
      currentFreightClass.lower = 8;
      currentFreightClass.upper = 9;
      currentFreightClass.currentClass = 110;
      currentFreightClass.nextClass = 100;
    }
    if (density >= 9.000001 && density <= 10.5) {
      currentFreightClass.lower = 9;
      currentFreightClass.upper = 10.5;
      currentFreightClass.currentClass = 100;
      currentFreightClass.nextClass = 92.5;
    }
    if (density >= 10.5 && density <= 12) {
      currentFreightClass.lower = 10.5;
      currentFreightClass.upper = 12;
      currentFreightClass.currentClass = 92.5;
      currentFreightClass.nextClass = 85;
    }
    if (density >= 12 && density <= 13.5) {
      currentFreightClass.lower = 12;
      currentFreightClass.upper = 13.5;
      currentFreightClass.currentClass = 85;
      currentFreightClass.nextClass = 77.5;
    }
    if (density >= 13.5 && density <= 15) {
      currentFreightClass.lower = 13.5;
      currentFreightClass.upper = 15;
      currentFreightClass.currentClass = 77.5;
      currentFreightClass.nextClass = 70;
    }
    if (density >= 15 && density <= 22.5) {
      currentFreightClass.lower = 15;
      currentFreightClass.upper = 22.5;
      currentFreightClass.currentClass = 70;
      currentFreightClass.nextClass = 65;
    }
    if (density >= 22.5 && density <= 30) {
      currentFreightClass.lower = 22.5;
      currentFreightClass.upper = 30;
      currentFreightClass.currentClass = 65;
      currentFreightClass.nextClass = 60;
    }
    if (density >= 30 && density <= 35) {
      currentFreightClass.lower = 30;
      currentFreightClass.upper = 35;
      currentFreightClass.currentClass = 60;
      currentFreightClass.nextClass = 55;
    }
    if (density >= 35 && density <= 50) {
      currentFreightClass.lower = 35;
      currentFreightClass.upper = 50;
      currentFreightClass.currentClass = 55;
      currentFreightClass.nextClass = 50;
    }
    if (density > 50) {
      currentFreightClass.lower = 50;
      currentFreightClass.upper = 50;
      currentFreightClass.nextClass = 50;
      currentFreightClass.currentClass = 50;
    }
    const lowDiff = Math.abs(currentFreightClass.lower - density);
    const highDiff = currentFreightClass.upper - density;

    if (lowDiff < highDiff) {
      commodityStore.update((commodities) => {
        const strClass = currentFreightClass.currentClass.toString().replace('.', '');
        const mappedFreightClass = mapToFreightType('class' + strClass);
        commodities[index].freightClass = mappedFreightClass.value;
        return commodities;
      });
    } else {
      commodityStore.update((commodities) => {
        const strClass = currentFreightClass.nextClass.toString().replace('.', '');
        const mappedFreightClass = mapToFreightType('class' + strClass);
        commodities[index].freightClass = mappedFreightClass.value;
        return commodities;
      });
    }
  }
}
export function addCommodity(index: number) {
  const newCommodity = getNewCommodity(index);
  console.log(newCommodity);
  commodityStore.update((value) => {
    if (value.length < 6) {
      value.push(newCommodity);
      value = value;
      if (browser) {
        setTimeout(() => {
          const newItemElement = document.getElementById('item_' + index);
          if (newItemElement) {
            newItemElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 200);
      }
      return value;
    } else {
      toast.error(
        'can not add more than 6 pallets. Please call to get VLTL rates which will be better option for you.',
        { duration: 10000 }
      );
    }
    return value;
  });
}
export function removeCommodity(index: number) {
  const newCommodity: commodity[] = [];
  const oldCommodities = get(commodityStore);
  if (oldCommodities.length > 1) {
    const resOfCommodities = oldCommodities.filter((value, _) => value.index != index);
    for (let i = 0; i < resOfCommodities.length; i++) {
      newCommodity[i] = resOfCommodities[i];
      newCommodity[i].index = i;
    }
    commodityStore.set(newCommodity);
  } else {
    toast.error('You cannot remove the last commodity');
  }
}
export function editCommodity() {
  commodityStore.set(localStorageCommodity());
}
export function updateCommodities(commodities: commodity[]) {
  commodityStore.set(commodities);
}
export function validateCommodities(): boolean {
  return false;
}
export function resetCommodities() {
  commodityStore.set([getNewCommodity(0)]);
}
