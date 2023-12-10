/* eslint-disable */

export const protobufPackage = "v1";

export interface userStatus {
  /** @gotags: dynamodbav:"isLocked,omitempty" */
  isLocked: boolean;
  /** @gotags: dynamodbav:"since,omitempty" */
  since: string;
}
