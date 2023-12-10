/* eslint-disable */
import type { amount } from "./amount";

export const protobufPackage = "v1";

export interface bid {
  /** @gotags: dynamodbav:"bidId,omitempty" */
  bidId: string;
  /** @gotags: dynamodbav:"carrier,omitempty" */
  carrier: string;
  /** @gotags: dynamodbav:"amount,omitempty" */
  amount:
    | amount
    | undefined;
  /** @gotags: dynamodbav:"transitTime,omitempty" */
  transitTime: string;
  /** @gotags: dynamodbav:"guranteed,omitempty" */
  guranteed: boolean;
  /** @gotags: dynamodbav:"vendorLogo,omitempty" */
  vendorLogo: string;
  /** @gotags: dynamodbav:"deliveryDate,omitempty" */
  deliveryDate: string;
  /** @gotags: dynamodbav:"vendorQuoteId,omitempty" */
  vendorQuoteId: string;
  /** @gotags: dynamodbav:"capacityProviderQuoteId,omitempty" */
  capacityProviderQuoteId: string;
  /** @gotags: dynamodbav:"vendorName,omitempty" */
  vendorName: string;
  /** @gotags: dynamodbav:"carrierName,omitempty" */
  carrierName: string;
  /** @gotags: dynamodbav:"carrierCode,omitempty" */
  carrierCode: string;
  /** @gotags: dynamodbav:"type,omitempty" */
  type: string;
  /** @gotags: dynamodbav:"carrierQuoteId,omitempty" */
  carrierQuoteId: string;
  /** @gotags: dynamodbav:"quoteId,omitempty" */
  quoteId: string;
  /** @gotags: dynamodbav:"carrierID,omitempty" */
  carrierID: number;
  /** @gotags: dynamodbav:"destination,omitempty" */
  destination: string;
  /** @gotags: dynamodbav:"origin,omitempty" */
  origin: string;
  /** @gotags: dynamodbav:"opportunityId,omitempty" */
  opportunityId: number;
  /** @gotags: dynamodbav:"serviceLevelCode,omitempty" */
  serviceLevelCode: string;
  /** @gotags: dynamodbav:"serviceName,omitempty" */
  serviceName: string;
  /** @gotags: dynamodbav:"serviceType,omitempty" */
  serviceType: number;
  /** @gotags: dynamodbav:"shipmentId,omitempty" */
  shipmentId: string;
  /** @gotags: dynamodbav:"platform,omitempty" */
  platform: string;
}

export interface bids {
  /** @gotags: dynamodbav:"bids,omitempty" */
  bids: bid[];
}
