/* eslint-disable */

export const protobufPackage = "v1";

export enum shipmentStatusOption {
  placeHolderShipmentStatus = 0,
  quoteGenerated = 1,
  booked = 2,
  pickupDriverAssigned = 3,
  pickupDriverDispatched = 4,
  pickedUpFromShipper = 5,
  arrivedAtShippingWarehouse = 6,
  arrivedAtTransitWarehouse = 7,
  arrivedAtDeliveryWarehouse = 8,
  documentNeeded = 9,
  shippersInformationNeeded = 10,
  receiverInformaationNeeded = 11,
  arrivedAtCustom = 12,
  releasedFromCustom = 13,
  onHold = 14,
  deliveryDriverAssigned = 15,
  deliveryDriverDespatched = 16,
  arrivedAtDeliveryLocation = 17,
  deliveryRefusedByReceiver = 18,
  deliveryRescheduledByReceiver = 19,
  unableToDeliver = 20,
  contactToScheduleDelivery = 21,
  deliveryRetried = 22,
  delivered = 23,
  wrongDeliveryAddress = 24,
  deliveryRescheduledByShipper = 25,
  deliveryRescheduledByCarrier = 26,
  UNRECOGNIZED = -1,
}

export interface shipmentStatusData {
  /** @gotags: dynamodbav:"date,omitempty" */
  date: string;
  /** @gotags: dynamodbav:"shipmentStatusOption,omitempty" */
  shipmentStatusOption: shipmentStatusOption;
  /** @gotags: dynamodbav:"comment,omitempty" */
  comment: string;
  /** @gotags: dynamodbav:"currentLocation,omitempty" */
  currentLocation: string;
}

export interface shipmentTracking {
  /** @gotags: dynamodbav:"shipmentId,omitempty" */
  shipmentId: string;
  /** @gotags: dynamodbav:"carrierId,omitempty" */
  carrierId: string;
  /** @gotags: dynamodbav:"shipperId,omitempty" */
  shipperId: string;
  /** @gotags: dynamodbav:"receiverId,omitempty" */
  receiverId: string;
  /** @gotags: dynamodbav:"shipmentStatusData,omitempty" */
  shipmentStatusData: shipmentStatusData[];
  /** @gotags: dynamodbav:"createdAt,omitempty" */
  createdAt: string;
  /** @gotags: dynamodbav:"updatedAt,omitempty" */
  updatedAt: string;
}
