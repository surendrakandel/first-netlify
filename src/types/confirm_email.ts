/* eslint-disable */

export const protobufPackage = "v1";

export interface confirmEmail {
  /** @gotags: dynamodbav:"email,omitempty" */
  email: string;
  /** @gotags: dynamodbav:"userName,omitempty" */
  userName: string;
  /** @gotags: dynamodbav:"confirmationCode,omitempty" */
  confirmationCode: string;
  /** @gotags: dynamodbav:"token,omitempty" */
  token: string;
  /** @gotags: dynamodbav:"businessId,omitempty" */
  businessId: string;
}
