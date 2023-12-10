/* eslint-disable */
import type { bid } from "./bid";
import type { quoteRequest } from "./quote";

export const protobufPackage = "v1";

export enum freightChargeTerm {
  unknownFreightChargeTerm = 0,
  CHARGENONE = 1,
  THIRDPARTY = 2,
  INBOUNDCOLLECT = 3,
  PREPAID = 4,
  UNRECOGNIZED = -1,
}

export interface bookingResponse {
  /** @gotags: dynamodbav:"quoteRequest,omitempty" */
  quoteRequest:
    | quoteRequest
    | undefined;
  /** @gotags: dynamodbav:"bookingInfo,omitempty" */
  bookingInfo:
    | bookingInfo
    | undefined;
  /** @gotags: dynamodbav:"svgData,omitempty" */
  svgData: string;
  /** @gotags: dynamodbav:"bid,omitempty" */
  bid: bid | undefined;
}

export interface bookingInfo {
  /** @gotags: dynamodbav:"bookingId,omitempty" */
  bookingId: string;
  /** @gotags: dynamodbav:"firstShipperBolNumber,omitempty" */
  firstShipperBolNumber: string;
  /** @gotags: dynamodbav:"freightChargeTerm,omitempty" */
  freightTerm: freightChargeTerm;
  /** @gotags: dynamodbav:"carrierName,omitempty" */
  carrierName: string;
  /** @gotags: dynamodbav:"carrierPhone,omitempty" */
  carrierPhone: string;
  /** @gotags: dynamodbav:"carrierEmail,omitempty" */
  carrierEmail: string;
  /** @gotags: dynamodbav:"carrierProNumber,omitempty" */
  carrierProNumber: string;
  /** @gotags: dynamodbav:"carrierLogoUrl,omitempty" */
  carrierLogoUrl: string;
  /** @gotags: dynamodbav:"carrierBolNumber,omitempty" */
  carrierBolNumber: string;
  /** @gotags: dynamodbav:"firstShipperReferences,omitempty" */
  firstShipperReferences: string;
  /** @gotags: dynamodbav:"pickupNumber,omitempty" */
  carrierPickupNumber: string;
  /** @gotags: dynamodbav:"serviceType,omitempty" */
  serviceType: string;
  /** @gotags: dynamodbav:"bolUrl,omitempty" */
  bolUrl: string;
  /** @gotags: dynamodbav:"proNumberSvgUrl,omitempty" */
  proNumberSvgUrl: string;
  /** @gotags: dynamodbav:"carrierQuoteNumber,omitempty" */
  carrierQuoteNumber: string;
  /** @gotags: dynamodbav:"pickupDate,omitempty" */
  pickupDate: string;
  /** @gotags: dynamodbav:"carrierReferences,omitempty" */
  carrierReferences: string;
  /** @gotags: dynamodbav:"transitDays,omitempty" */
  transitDays: number;
  /** @gotags: dynamodbav:"platform,omitempty" */
  platform: string;
  /** @gotags: dynamodbav:"bolGenerated,omitempty" */
  bolGenerated: boolean;
}

export interface bookings {
  /** @gotags: dynamodbav:"bookingResponses,omitempty" */
  bookingResponses: bookingResponse[];
}

export interface DispatchResponse {
  /** @gotags: dynamodbav:"shipmentId,omitempty" */
  ShipmentID: number;
  /** @gotags: dynamodbav:"securityKey,omitempty" */
  SecurityKey: string;
  /** @gotags: dynamodbav:"pickupNumber,omitempty" */
  PickupNumber: string;
  /** @gotags: dynamodbav:"carrierName,omitempty" */
  CarrierName: string;
  /** @gotags: dynamodbav:"carrierPhone,omitempty" */
  CarrierPhone: string;
  /** @gotags: dynamodbav:"CarrierProNumber,omitempty" */
  CarrierProNumber: string;
  /** @gotags: dynamodbav:"handlingUnitTotal,omitempty" */
  HandlingUnitTotal: number;
  /** @gotags: dynamodbav:"isShipmentEdit,omitempty" */
  IsShipmentEdit: boolean;
  /** @gotags: dynamodbav:"isShipmentManual,omitempty" */
  IsShipmentManual: boolean;
  /** @gotags: dynamodbav:"serviceType,omitempty" */
  ServiceType: number;
  /** @gotags: dynamodbav:"isTrackingEmailSend,omitempty" */
  IsTrackingEmailSend: boolean;
  /** @gotags: dynamodbav:"isTrackingAPIEnabled,omitempty" */
  IsTrackingAPIEnabled: boolean;
  /** @gotags: dynamodbav:"customerBOLNumber,omitempty" */
  CustomerBOLNumber: string;
  /** @gotags: dynamodbav:"shipperEmail,omitempty" */
  ShipperEmail: string;
  /** @gotags: dynamodbav:"consigneeEmail,omitempty" */
  ConsigneeEmail: string;
  /** @gotags: dynamodbav:"result,omitempty" */
  Result: Result | undefined;
}

export interface Result {
  /** @gotags: dynamodbav:"capacityProviderBolUrl,omitempty" */
  CapacityProviderBolUrl: string;
  /** @gotags: dynamodbav:"shipmentIdentifier,omitempty" */
  ShipmentIdentifier: string;
  /** @gotags: dynamodbav:"pickupNote,omitempty" */
  PickupNote: string;
  /** @gotags: dynamodbav:"pickupDateTime,omitempty" */
  PickupDateTime: string;
  /** @gotags: dynamodbav:"errors,omitempty" */
  Errors: string[];
  /** @gotags: dynamodbav:"infoMessages,omitempty" */
  InfoMessages: string[];
  /** @gotags: dynamodbav:"type,omitempty" */
  Type: string;
}

export interface BookRequest {
  quoteRequest: quoteRequest | undefined;
  bidId: string;
}
