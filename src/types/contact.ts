/* eslint-disable */
import type { role } from "./role";

export const protobufPackage = "v1";

export interface contact {
  /** @gotags: dynamodbav:"name,omitempty" */
  name: string;
  /** @gotags: dynamodbav:"phoneNumber,omitempty" */
  phoneNumber: string;
  /** @gotags: dynamodbav:"emailAddress,omitempty" */
  emailAddress: string;
  /** @gotags: dynamodbav:"phoneNumberDisplay,omitempty" */
  phoneNumberDisplay: string;
  /** @gotags: dynamodbav:"roles,omitempty" */
  roles: role[];
  /** @gotags: dynamodbav:"prefferedContactMethod,omitempty" */
  prefferedContactMethod: string;
  /** @gotags: dynamodbav:"businessId,omitempty" */
  businessId: string;
  /** @gotags: dynamodbav:"type,omitempty" */
  type: string;
}
