/* eslint-disable */

export const protobufPackage = "v1";

export interface amount {
  /** @gotags: dynamodbav:"fullAmount,omitempty" */
  fullAmount: number;
  /** @gotags: dynamodbav:"discountApplied,omitempty" */
  discountApplied: number;
  /** @gotags: dynamodbav:"netAmount,omitempty" */
  netAmount: number;
}
