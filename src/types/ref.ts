/* eslint-disable */

export const protobufPackage = "v1";

export interface reference {
  /** @gotags: dynamodbav:"vendorBol,omitempty" */
  vendorBol: string;
  /** @gotags: dynamodbav:"bol,omitempty" */
  bol: string;
  /** @gotags: dynamodbav:"vendorReferenceId,omitempty" */
  vendorReferenceId: string;
  /** @gotags: dynamodbav:"pickupNo,omitempty" */
  pickupNo: string;
  /** @gotags: dynamodbav:"invoiceNo,omitempty" */
  invoiceNo: string;
  /** @gotags: dynamodbav:"vendorInvoiceNum,omitempty" */
  vendorInvoiceNum: string;
  /** @gotags: dynamodbav:"businessId,omitempty" */
  businessId: string;
  /** @gotags: dynamodbav:"type,omitempty" */
  type: string;
}
