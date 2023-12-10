/* eslint-disable */
import type { bid } from "./bid";
import type { business } from "./business";
import type { commodity } from "./commodity";
import type { location } from "./location";

export const protobufPackage = "v1";

export interface shipmentInfo {
  /** @gotags: dynamodbav:"quoteId,omitempty" */
  quoteId: string;
  /** @gotags: dynamodbav:"requesterId,omitempty" */
  requesterId: string;
  /** @gotags: dynamodbav:"mode,omitempty" */
  mode: string;
  /** @gotags: dynamodbav:"liablePartyId,omitempty" */
  liablePartyId: string;
  /** @gotags: dynamodbav:"pickupDate,omitempty" */
  pickupDate: string;
  /** @gotags: dynamodbav:"displayDate,omitempty" */
  displayDate: string;
  /** @gotags: dynamodbav:"deliveryDate,omitempty" */
  deliveryDate: string;
  /** @gotags: dynamodbav:"totalItems,omitempty" */
  totalItems: number;
  /** @gotags: dynamodbav:"totalWeight,omitempty" */
  totalWeight: number;
  /** @gotags: dynamodbav:"validUntil,omitempty" */
  validUntil: string;
  /** @gotags: dynamodbav:"editMode,omitempty" */
  editMode: boolean;
  /** @gotags: dynamodbav:"businessId,omitempty" */
  businessId: string;
  /** @gotags: dynamodbav:"shipmentType,omitempty" */
  shipmentType: string;
  /** @gotags: dynamodbav:"specialInstruction,omitempty" */
  specialInstruction: string;
  /** @gotags: dynamodbav:"shipperPickupReadyBy,omitempty" */
  shipperPickupReadyBy: string;
  /** @gotags: dynamodbav:"business,omitempty" */
  business:
    | business
    | undefined;
  /** @gotags: dynamodbav:"requesterEmail,omitempty" */
  requesterEmail: string;
  /** @gotags: dynamodbav:"shipmentValue,omitempty" */
  shipmentValue: number;
  /** @gotags: dynamodbav:"totalLength,omitempty" */
  totalLength: number;
  /** @gotags: dynamodbav:"totalWidth,omitempty" */
  totalWidth: number;
  /** @gotags: dynamodbav:"totalHeight,omitempty" */
  totalHeight: number;
  /** @gotags: dynamodbav:"pickupReadyTime,omitempty" */
  pickupReadyTime: string;
}

export interface quoteRequest {
  /** @gotags: dynamodbav:"shipmentInfo,omitempty" */
  shipmentInfo:
    | shipmentInfo
    | undefined;
  /** @gotags: dynamodbav:"commodities,omitempty" */
  commodities: commodity[];
  /** @gotags: dynamodbav:"pickup,omitempty" */
  pickup:
    | location
    | undefined;
  /** @gotags: dynamodbav:"delivery,omitempty" */
  delivery: location | undefined;
}

export interface quoteResponse {
  /** @gotags: dynamodbav:"quoteRequest,omitempty" */
  quoteRequest:
    | quoteRequest
    | undefined;
  /** @gotags: dynamodbav:"bids,omitempty" */
  bids: bid[];
  /** @gotags: dynamodbav:"success,omitempty" */
  success: boolean;
}

export interface quotesRequest {
  /** @gotags: dynamodbav:"quoteRequest,omitempty" */
  quoteRequests: quoteRequest[];
}

export interface quotesResponse {
  /** @gotags: dynamodbav:"quoteResponses,omitempty" */
  quoteResponses: quoteResponse[];
}
