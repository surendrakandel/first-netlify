import { browser } from '$app/environment';
import type { errorInfo } from '$src/lib/custom_types';
import { getNewLocation } from '$src/lib/utils/new_location';
import type { location } from '$src/types/location';
import { writable, type Writable } from 'svelte/store';
export interface quoteDeliveryErrors {
  deliveryZipCode: errorInfo;
  deliveryLocationServices: errorInfo;
}
function localStorageDeliveryLocation(): location {
  if (browser) {
    try {
      const currentDeliveryLocationStr = localStorage.getItem('currentDeliveryLocation') || JSON.stringify(getNewLocation());
      const currentDeliveryLocation: location = JSON.parse(currentDeliveryLocationStr);
      return currentDeliveryLocation;
    } catch (error) {
      return getNewLocation();
    }
  } else {
    return getNewLocation();
  }
}
export interface deliveryLocationWorker {
  deliveryStore: Writable<location>;
  resetDeliveryLocation: () => void;
  editDeliveryLocation: () => void;
  validateDeliveryLocation: () => boolean;
  updateDeliveryLocation: (location: location) => void;
  quoteDeliveryErrorsStore: Writable<quoteDeliveryErrors>;
}
function initDeliveryLocationWorker(): deliveryLocationWorker {
  const deliveryStore: Writable<location> = writable(getNewLocation());
  const quoteDeliveryErrorsStore: Writable<quoteDeliveryErrors> = writable({
    deliveryZipCode: {
      valid: true,
      message: 'delivery zip code is invalid'
    },
    deliveryLocationServices: {
      valid: true,
      message: 'please choose LiftGate Pickup or Location with Loading Dock'
    }
  });
 
    if (browser) {
      let isEdit = localStorage.getItem('isEdit') || false;
      let backupAddress = getNewLocation();
      if (isEdit && isEdit != "" || isEdit != "false" && isEdit== "true") {
          backupAddress = localStorageDeliveryLocation();
          deliveryStore.set(backupAddress);
      }
      deliveryStore.subscribe((val) => {
        localStorage.setItem('currentDeliveryLocation', JSON.stringify(val));
      });
  };
  function resetDeliveryLocation() {
    deliveryStore.set(getNewLocation());
  }
  function editDeliveryLocation() {
    deliveryStore.set(localStorageDeliveryLocation());
  }
  function validateDeliveryLocation(): boolean {
    return false;
  }
  function updateDeliveryLocation(location: location) {
    deliveryStore.set(location);
  }
  return {
    deliveryStore,
    resetDeliveryLocation,
    editDeliveryLocation,
    validateDeliveryLocation,
    updateDeliveryLocation,
    quoteDeliveryErrorsStore
  };
}
export const {
  deliveryStore,
  resetDeliveryLocation,
  editDeliveryLocation,
  validateDeliveryLocation,
  updateDeliveryLocation,
  quoteDeliveryErrorsStore
} = initDeliveryLocationWorker();
