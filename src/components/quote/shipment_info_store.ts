import { browser } from '$app/environment';
import { newShipmentInfo } from '$src/lib/utils/new_shipment_info';
import type { shipmentInfo } from '$src/types/quote';
import { writable, type Writable } from 'svelte/store';
export interface errorInfo {
  message: string;
  valid: boolean;
}
export interface quoteShipmentErrorsType {
  pickupDate: errorInfo;
  shipmentValue: errorInfo;
}

function newErrorValue(): quoteShipmentErrorsType {
  return {
    shipmentValue: {
      valid: true,
      message: 'shipment value must be greater than 0'
    },
    pickupDate: {
      valid: true,
      message: 'pickup date is invalid'
    }
  };
}
function localStorageShipmentInfo(): shipmentInfo {
  if (browser) {
    try {
      const localshipmentInfoStr = localStorage.getItem('currentShipmentInfo') || JSON.stringify(newShipmentInfo()) ;
      if(localshipmentInfoStr == null || localshipmentInfoStr == undefined || localshipmentInfoStr == ""){
        return newShipmentInfo();
      }
      const currentShipmentInfo: shipmentInfo = JSON.parse(localshipmentInfoStr);
      return currentShipmentInfo;
    } catch (error) {
      return newShipmentInfo();
    }
  } else {
    return newShipmentInfo();
  }
}
export interface shipmentInfoWorker {
  shipmentInfoStore: Writable<shipmentInfo>;
  quoteShipmentErrors: Writable<quoteShipmentErrorsType>;
}
function initShipmentWorker(): shipmentInfoWorker {
  const shipmentInfoStore: Writable<shipmentInfo> = writable(newShipmentInfo());
  const quoteShipmentErrors: Writable<quoteShipmentErrorsType> = writable(newErrorValue());
  if (browser) {
     let isEdit = localStorage.getItem('isEdit') || false;
     let backupInfo = newShipmentInfo();
     if (isEdit && isEdit != "" || isEdit != "false" && isEdit== "true") {
        backupInfo = localStorageShipmentInfo();
        shipmentInfoStore.set(backupInfo);
     }
    shipmentInfoStore.subscribe((val) => {
      localStorage.setItem('currentShipmentInfo', JSON.stringify(val));
    });
  }
  return {
    shipmentInfoStore,
    quoteShipmentErrors
  };
}
export const { shipmentInfoStore, quoteShipmentErrors } = initShipmentWorker();
export function resetShipmentInfo() {
  shipmentInfoStore.set(newShipmentInfo());
}
export function editShipmentInfo() {
  shipmentInfoStore.set(localStorageShipmentInfo());
}
export function validateShipmentInfo(): boolean {
  return false;
}
export function updateShipmentInfo(shipmentInfo: shipmentInfo) {
  shipmentInfoStore.set(shipmentInfo);
}
export interface pickupDateInfo {
  valid: boolean;
  isToday: boolean;
  alertMessage: string;
  alert: boolean;
  pickupDate: string;
}
// Function to check if a date is a weekday
function isWeekday(date:any) {
  const day = date.getDay();
  return day != 6 && day != 0;
}
// Function to get the next available pickup date
function isValidPickupTime(date:Date) {
  // Get today's date and time
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const currentTime = now.getHours();

 if (date.getTime() === today.getTime() && currentTime >= 16) {
   return false;
  }

  return true;
}

export function validatePickupDate(dateData: Date[]) {
  let date = dateData[0]
  if (date === undefined || date === null || date.toString() === 'Invalid Date' || !isWeekday(date) || !isValidPickupTime(date)) {
    quoteShipmentErrors.update((value) => {
      value.pickupDate.valid = false;
      value.pickupDate.message = 'Pickup date is invalid';
      return value;
    });
    shipmentInfoStore.update((value) => {
      value.pickupDate = '';
      value.displayDate = '';
      return value;
    });
    return;
  }
  shipmentInfoStore.update((value) => {
      let givenDate = dateData[0];
      if(value.pickupReadyTime != undefined && value.pickupReadyTime != null && value.pickupReadyTime != ""){
        let time = value.pickupReadyTime.split(":");
        givenDate.setHours(parseInt(time[0]));
        givenDate.setMinutes(parseInt(time[1]));
      }
      var year = givenDate.getUTCFullYear();
      var month = String(givenDate.getUTCMonth() + 1).padStart(2, '0');
      var day = String(givenDate.getUTCDate()).padStart(2, '0');
      var hours = String(givenDate.getUTCHours()).padStart(2, '0');
      var minutes = String(givenDate.getUTCMinutes()).padStart(2, '0');
      var seconds = String(givenDate.getUTCSeconds()).padStart(2, '0');
      // Combine the date and time components into a string
      var utcTimeString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
      value.pickupDate = utcTimeString;
    return value;
  });
}
export function validateShipmentValue(event: Event) {
  //@ts-ignore
  let target = event?.target as HTMLInputElement;
  let shipmentValue = parseFloat(target.value);
  if (isNaN(shipmentValue)) {
    quoteShipmentErrors.update((value) => {
      value.shipmentValue.valid = false;
      value.shipmentValue.message = 'shipment value must be a number';
      return value;
    });
    shipmentInfoStore.update((value) => {
      value.shipmentValue = 0;
      return value;
    });
    return;
  } else if (shipmentValue < 1 || shipmentValue > 100000) {
    quoteShipmentErrors.update((value) => {
      value.shipmentValue.valid = false;
      value.shipmentValue.message = 'shipment value must be between 1 and 100,000';
      return value;
    });
    shipmentInfoStore.update((value) => {
      value.shipmentValue = 0;
      return value;
    });
    return;
  }
  quoteShipmentErrors.update((value) => {
    value.shipmentValue.valid = true;
    return value;
  });
  shipmentInfoStore.update((value) => {
    value.shipmentValue = shipmentValue;
    return value;
  });
}
