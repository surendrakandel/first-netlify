/* eslint-disable */

export const protobufPackage = "v1";

export interface refreshToken {
  /** @gotags: dynamodbav:"refreshToken,omitempty" */
  refreshToken: string;
}

export interface token {
  /** @gotags: dynamodbav:"token,omitempty" */
  token: string;
}
