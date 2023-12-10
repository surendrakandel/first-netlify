/* eslint-disable */

export const protobufPackage = "v1";

export interface forgotPassword {
  /** @gotags: dynamodbav:"email" */
  email: string;
}

export interface resetPasswordToken {
  /** @gotags: dynamodbav:"issuedTo,omitempty" */
  issuedTo: string;
  /** @gotags: dynamodbav:"issuedOn,omitempty" */
  issuedOn: string;
  /** @gotags: dynamodbav:"expiresOn,omitempty" */
  expiresOn: string;
  /** @gotags: dynamodbav:"token,omitempty" */
  token: string;
  /** @gotags: dynamodbav:"businessId,omitempty" */
  businessId: string;
}

export interface resetPassword {
  /** @gotags: dynamodbav:"token,omitempty" */
  token: string;
  /** @gotags: dynamodbav:"newPassword,omitempty" */
  newPassword: string;
  /** @gotags: dynamodbav:"confirmPassword,omitempty" */
  confirmPassword: string;
  /** @gotags: dynamodbav:"email,omitempty" */
  email: string;
  /** @gotags: dynamodbav:"userId,omitempty" */
  userId: string;
  /** @gotags: dynamodbav:"accessToken,omitempty" */
  accessToken: string;
  /** @gotags: dynamodbav:"refreshToken,omitempty" */
  refreshToken: string;
}
