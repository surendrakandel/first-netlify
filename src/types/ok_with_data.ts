/* eslint-disable */

export const protobufPackage = "v1";

export interface OkWithData {
  /** @gotags: dynamodbav:"success" */
  success: boolean;
  /** @gotags: dynamodbav:"statusCode" */
  statusCode: number;
  /** @gotags: dynamodbav:"message" */
  message: string;
  /** @gotags: dynamodbav:"data" */
  data: Any | undefined;
}

export interface Any {
  /** @gotags: dynamodbav:"type_url" */
  typeUrl: string;
  /** @gotags: dynamodbav:"value" */
  value: Uint8Array;
}
