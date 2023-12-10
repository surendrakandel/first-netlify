import { getNewCommodity } from '$src/lib/utils/newCommodity';
import { getNewLocation } from '$src/lib/utils/new_location';
import type { quoteRequest } from '$src/types/quote';
import { writable, type Writable, get } from 'svelte/store';
import z from 'zod';
import { newShipmentInfo } from '$src/lib/utils/new_shipment_info';
import {
  editPickupLocation,
  pickupStore,
  resetPickupLocation,
  updatePickupLocation
} from '$src/components/quote/pickup_store';
import {
  deliveryStore,
  editDeliveryLocation,
  resetDeliveryLocation,
  updateDeliveryLocation
} from '$src/components/quote/delivery_store';
import {
  editShipmentInfo,
  shipmentInfoStore,
  resetShipmentInfo,
  updateShipmentInfo
} from '$src/components/quote/shipment_info_store';
import {
  commodityStore,
  editCommodity,
  resetCommodities,
  updateCommodities
} from '$src/components/quote/commodity_store';

export function newQuote(): quoteRequest {
  const newQt: quoteRequest = {
    shipmentInfo: newShipmentInfo(),
    commodities: [getNewCommodity(0)],
    pickup: getNewLocation(),
    delivery: getNewLocation()
  };
  return newQt;
}

export function validateQuoteRequest(currentQuote: quoteRequest): boolean {
  const zod_quote_request = z.object({
    shipmentInfo: z.object({
      shipmentValue: z.number().refine((value) => value > 0 && value < 1000000, {
        message: 'Shipment Value must be between 0 and 1,000,000'
      }),
      pickupDate: z.string()
    }),
    commodities: z
      .array(
        z.object({
          weight: z.number().refine((value) => value > 0 && value < 30000, {
            message: 'Weight must be between 50 and 7000 lbs'
          }),
          length: z.number().refine((value) => value > 0 && value <= 75, {
            message: 'Length must be between 0 and 75'
          }),
          width: z.number().refine((value) => value > 0 && value <= 75, {
            message: 'Width must be between 0 and 75'
          }),
          height: z.number().refine((value) => value > 0 && value <= 75, {
            message: 'Height must be between 0 and 75'
          }),
          packageType: z.number().min(0).max(19),
          description: z.string().min(2)
        })
      )
      .min(1),
    pickup: z.object({
      address: z.object({
        zipCode: z.string().min(5).max(5)
      })
    }),
    delivery: z.object({
      address: z.object({
        zipCode: z.string().min(5).max(5)
      })
    })
  });
  const valid =
  currentQuote?.shipmentInfo?.shipmentValue &&
    currentQuote.shipmentInfo.shipmentValue < 1000000;
  const result = zod_quote_request.safeParse(currentQuote);
  return result.success && valid == true;
}
export function zodValidateBookRequest(): boolean {
  const zod_book_request = z.object({
    commodities: z
      .array(
        z.object({
          description: z.string().min(2),
          weight: z.number().refine((value) => value > 0 && value < 5000, {
            message: 'Weight must be between 50 and 5000 lbs'
          }),
          weightUOM: z.object({
            LB: z.boolean()
          }),
          dimensionUOM: z.object({
            INCH: z.boolean()
          }),
          length: z.number().refine((value) => value > 0 && value <= 75, {
            message: 'Length must be between 0 and 75'
          }),
          width: z.number().refine((value) => value > 0 && value <= 75, {
            message: 'Width must be between 0 and 75'
          }),
          height: z.number().refine((value) => value > 0 && value <= 75, {
            message: 'Height must be between 0 and 75'
          }),
          packageType: z.number().min(1).max(7)
        })
      )
      .min(1),
    delivery: z.object({
      companyName: z.string().min(2),
      contact: z.object({
        name: z.string().min(2),
        phoneNumber: z.string().min(10),
        emailAddress: z.string().email()
      }),
      address: z.object({
        addressLine1: z.string().min(4),
        state: z.string().min(2),
        zipCode: z.string().min(5)
      })
    }),
    pickup: z.object({
      companyName: z.string().min(2),
      contact: z.object({
        name: z.string().min(2),
        phoneNumber: z.string().min(10).max(10),
        emailAddress: z.string().email()
      }),
      address: z.object({
        addressLine1: z.string().min(5),
        state: z.string().min(2),
        zipCode: z.string().min(5)
      })
    }),
    pickupDate: z.string().min(10),
    quoteId: z.string().min(5),
    totalItems: z.number().min(1),
    totalWeight: z.number().min(1),
    shipmentValue: z.number().min(1),
    type: z.string().min(1)
  });
  const currentQuote: quoteRequest = {
    pickup: get(pickupStore),
    delivery: get(deliveryStore),
    commodities: get(commodityStore),
    shipmentInfo: get(shipmentInfoStore)
  };
  const result = zod_book_request.safeParse(currentQuote);
  return result.success;
}

export function updateQuote(qtReq: quoteRequest) {
  try {
    if(qtReq.pickup && qtReq.delivery && qtReq.commodities && qtReq.shipmentInfo){
      updatePickupLocation(qtReq.pickup);
      updateDeliveryLocation(qtReq.delivery);
      updateCommodities(qtReq.commodities);
      updateShipmentInfo(qtReq.shipmentInfo);
    }
    
  } catch (error) {
    console.log('Error reloading quote store: ', error);
  }
}
export function editQuote() {
  try {
    editCommodity();
    editPickupLocation();
    editDeliveryLocation();
    editShipmentInfo();
  } catch (error) {
    console.log('Error reloading quote store: ', error);
  }
}
export function reloadQuote() {
  const shipmentInfo = get(shipmentInfoStore);
  if (shipmentInfo.editMode) {
    editQuote();
  } else {
    resetQuote();
  }
}
export function resetQuote() {
  resetPickupLocation();
  resetDeliveryLocation();
  resetCommodities();
  resetShipmentInfo();
}
export const pickupPromptStore: Writable<boolean> = writable(false);
export function togglePickupPrompt() {
  pickupPromptStore.update((value) => {
    return !value;
  });
}
