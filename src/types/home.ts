/* eslint-disable */

export const protobufPackage = "v1";

export interface userHome {
  /** @gotags: dynamodbav:"userId,omitempty" */
  userId: string;
  /** @gotags: dynamodbav:"userEmail,omitempty" */
  userEmail: string;
  /** @gotags: dynamodbav:"businessId,omitempty" */
  businessId: string;
}
