/* eslint-disable */

export const protobufPackage = "v1";

export interface carrier {
  /** @gotags: dynamodbav:"name,omitempty" */
  name: string;
  /** @gotags: dynamodbav:"authUrl,omitempty" */
  authUrl: string;
  /** @gotags: dynamodbav:"rateUrl,omitempty" */
  rateUrl: string;
  /** @gotags: dynamodbav:"addAddressUrl,omitempty" */
  addAddressUrl: string;
  /** @gotags: dynamodbav:"getAddressUrl,omitempty" */
  getAddressUrl: string;
  /** @gotags: dynamodbav:"quoteHistoryUrl,omitempty" */
  quoteHistoryUrl: string;
}
