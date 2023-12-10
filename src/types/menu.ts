/* eslint-disable */

export const protobufPackage = "menu";

export interface createMenuData {
  /** @gotags: dynamodbav:"cousineType" */
  cousineType: string;
}

export interface menuResponse {
  /** @gotags: dynamodbav:"message" */
  message: string;
  /** @gotags: dynamodbav:"success" */
  success: boolean;
}
