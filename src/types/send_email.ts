/* eslint-disable */

export const protobufPackage = "v1";

export interface sendEmail {
  /** @gotags: dynamodbav:"emailSubject,omitempty" */
  emailSubject: string;
  /** @gotags: dynamodbav:"receiverEmail,omitempty" */
  receiverEmail: string;
  /** @gotags: dynamodbav:"receiverName,omitempty" */
  receiverName: string;
  /** @gotags: dynamodbav:"token,omitempty" */
  token: string;
  /** @gotags: dynamodbav:"success,omitempty" */
  success: boolean;
}
