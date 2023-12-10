/* eslint-disable */

export const protobufPackage = "v1";

export interface address {
  /** @gotags: dynamodbav:"addressLine1,omitempty" */
  addressLine1: string;
  /** @gotags: dynamodbav:"addressLine2,omitempty" */
  addressLine2: string;
  /** @gotags: dynamodbav:"streetName,omitempty" */
  streetName: string;
  /** @gotags: dynamodbav:"city,omitempty" */
  city: string;
  /** @gotags: dynamodbav:"county,omitempty" */
  county: string;
  /** @gotags: dynamodbav:"zipCode,omitempty" */
  zipCode: string;
  /** @gotags: dynamodbav:"state,omitempty" */
  state: string;
  /** @gotags: dynamodbav:"stateCode,omitempty" */
  stateCode: string;
  /** @gotags: dynamodbav:"extendedZipCode,omitempty" */
  extendedZipCode: string;
  /** @gotags: dynamodbav:"country,omitempty" */
  country: string;
  /** @gotags: dynamodbav:"countryCode,omitempty" */
  countryCode: string;
  /** @gotags: dynamodbav:"freeFormAddress,omitempty" */
  freeFormAddress: string;
  /** @gotags: dynamodbav:"localName,omitempty" */
  localName: string;
  /** @gotags: dynamodbav:"lat,omitempty" */
  lat: number;
  /** @gotags: dynamodbav:"long,omitempty" */
  long: number;
  /** @gotags: dynamodbav:"businessId,omitempty" */
  businessId: string;
  /** @gotags: dynamodbav:"type,omitempty" */
  type: string;
}
