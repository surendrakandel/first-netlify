
import { writable, type Writable } from 'svelte/store';
import type { quoteShipmentErrorsType } from '$src/components/quote/shipment_info_store';
import type { errorInfo } from '$src/lib/custom_types';

export interface bookShipmentErrorsType extends quoteShipmentErrorsType {
  shipperName: errorInfo;
  pickupZipCode: errorInfo;
  pickupLocationServices: errorInfo;
  pickupStreetAddress: errorInfo;
  shipperCompanyName: errorInfo;
  shipperPhoneNumber: errorInfo;
  shipperEmailAddress: errorInfo;
  receiverName: errorInfo;
  receiverCompanyName: errorInfo;
  receiverPhoneNumber: errorInfo;
  receiverEmailAddress: errorInfo;
  deliveryStreetAddress: errorInfo;
  deliveryZipCode: errorInfo;
  deliveryLocationServices: errorInfo;
}
export function newBookShipmentError(): bookShipmentErrorsType {
  return {
    shipperName: {
      valid: true,
      message: 'receiver name is invalid'
    },
    pickupStreetAddress: {
      valid: true,
      message: 'pickup street address is invalid'
    },
    pickupZipCode: {
      valid: true,
      message: 'pickup zip code is invalid'
    },
    pickupLocationServices: {
      valid: true,
      message: 'please choose LiftGate Pickup or Location with Loading Dock'
    },
    shipperCompanyName: {
      valid: true,
      message: 'receiver company name is invalid'
    },
    shipperEmailAddress: {
      valid: true,
      message: 'receiver email address is invalid'
    },
    shipperPhoneNumber: {
      valid: true,
      message: 'receiver phone number is invalid'
    },
    receiverName: {
      valid: true,
      message: 'receiver name is invalid'
    },
    receiverCompanyName: {
      valid: true,
      message: 'receiver company name is invalid'
    },
    receiverEmailAddress: {
      valid: true,
      message: 'receiver email address is invalid'
    },
    receiverPhoneNumber: {
      valid: true,
      message: 'receiver phone number is invalid'
    },
    shipmentValue: {
      valid: true,
      message: 'shipment value must be greater than 0'
    },
    pickupDate: {
      valid: true,
      message: 'pickup date is invalid'
    },
    deliveryZipCode: {
      valid: true,
      message: 'delivery zip code is invalid'
    },
    deliveryLocationServices: {
      valid: true,
      message: 'please choose LiftGate Delivery or Location with Loading Dock'
    },
    deliveryStreetAddress: {
      valid: true,
      message: 'delivery street address is invalid'
    }
  };
}
export interface bookShipmentDataType {
  bookShipmentErrorsStore: Writable<bookShipmentErrorsType>;
  validateReceiverPhoneNumber: (event: any) => void;
  validateReceiverEmail: (event: any) => void;
  validateReceiverName: (event: any) => void;
  validateReceiverCompanyName: (event: any) => void;
  validateShipperPhoneNumber: (event: any) => void;
  validateShipperEmail: (event: any) => void;
  validateShipperName: (event: any) => void;
  validateShipperCompanyName: (event: any) => void;
  validatePickupStreet: (event: any) => void;
  validateDeliveryStreet: (event: any) => void;
}
function initBookData(): bookShipmentDataType {
  const bookShipmentErrorsStore = writable(newBookShipmentError());
  function validateReceiverPhoneNumber(event: any) {
    const phoneNumber = event.target.value;
    const regex = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
    const valid = regex.test(phoneNumber);
    bookShipmentErrorsStore.update((bookShipmentErrors) => {
      bookShipmentErrors.receiverPhoneNumber.valid = valid;
      return bookShipmentErrors;
    });
  }
  function validateReceiverEmail(event: any) {
    const email = event.target.value;
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const valid = regex.test(email);
    bookShipmentErrorsStore.update((bookShipmentErrors) => {
      bookShipmentErrors.receiverEmailAddress.valid = valid;
      return bookShipmentErrors;
    });
  }
  function validateReceiverName(event: any) {
    const name = event.target.value;
    const valid = name.length > 3;
    bookShipmentErrorsStore.update((bookShipmentErrors) => {
      bookShipmentErrors.receiverName.valid = valid;
      return bookShipmentErrors;
    });
  }
  function validateReceiverCompanyName(event: any) {
    const name = event.target.value;
    const valid = name.length > 3;
    bookShipmentErrorsStore.update((bookShipmentErrors) => {
      bookShipmentErrors.receiverCompanyName.valid = valid;
      return bookShipmentErrors;
    });
  }
  function validateShipperPhoneNumber(event: any) {
    const phoneNumber = event.target.value;
    const regex = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
    const valid = regex.test(phoneNumber);
    bookShipmentErrorsStore.update((bookShipmentErrors) => {
      bookShipmentErrors.shipperPhoneNumber.valid = valid;
      return bookShipmentErrors;
    });
  }

  function validateShipperEmail(event: any) {
    const email = event.target.value;
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const valid = regex.test(email);
    bookShipmentErrorsStore.update((bookShipmentErrors) => {
      bookShipmentErrors.shipperEmailAddress.valid = valid;
      return bookShipmentErrors;
    });
  }
  function validateShipperName(event: any) {
    const name = event.target.value;
    const valid = name.length > 3;
    bookShipmentErrorsStore.update((bookShipmentErrors) => {
      bookShipmentErrors.shipperName.valid = valid;
      return bookShipmentErrors;
    });
  }
  function validateShipperCompanyName(event: any) {
    const name = event.target.value;
    const valid = name.length > 3;
    bookShipmentErrorsStore.update((bookShipmentErrors) => {
      bookShipmentErrors.shipperCompanyName.valid = valid;
      return bookShipmentErrors;
    });
  }
  function validatePickupStreet(event: any) {
    const value = event.target.value;
    const valid = value.length > 5;
    bookShipmentErrorsStore.update((bookShipmentErrors) => {
      bookShipmentErrors.pickupStreetAddress.valid = valid;
      return bookShipmentErrors;
    });
  }
  function validateDeliveryStreet(event: any) {
    const value = event.target.value;
    const valid = value.length > 5;
    bookShipmentErrorsStore.update((bookShipmentErrors) => {
      bookShipmentErrors.deliveryStreetAddress.valid = valid;
      return bookShipmentErrors;
    });
  }

  return {
    bookShipmentErrorsStore,
    validateReceiverPhoneNumber,
    validateReceiverEmail,
    validateReceiverName,
    validateReceiverCompanyName,
    validateShipperPhoneNumber,
    validateShipperEmail,
    validateShipperName,
    validateShipperCompanyName,
    validatePickupStreet,
    validateDeliveryStreet
  };
}
export const {
  bookShipmentErrorsStore,
  validateReceiverPhoneNumber,
  validateReceiverEmail,
  validateReceiverName,
  validateReceiverCompanyName,
  validateShipperPhoneNumber,
  validateShipperEmail,
  validateShipperName,
  validateShipperCompanyName,
  validatePickupStreet,
  validateDeliveryStreet
} = initBookData();
