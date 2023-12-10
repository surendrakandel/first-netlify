/* eslint-disable */

export const protobufPackage = "v1";

export enum phoneNumberType {
  placeHolderPhoneType = 0,
  home = 1,
  office = 2,
  cellPhone = 3,
  UNRECOGNIZED = -1,
}

export interface phoneNumber {
  /** @gotags: dynamodbav:"phoneNumber" */
  phoneNumber: string;
  /** @gotags: dynamodbav:"phoneNumberType" */
  type: phoneNumberType;
}
