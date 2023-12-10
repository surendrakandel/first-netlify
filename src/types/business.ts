/* eslint-disable */
import type { address } from "./address";
import type { phoneNumber } from "./phone_number";
import type { user } from "./user";

export const protobufPackage = "v1";

export interface business {
  /** @gotags: dynamodbav:"type" */
  type: string;
  /** @gotags: dynamodbav:"businessName" */
  businessName: string;
  /** @gotags: dynamodbav:"businessId" */
  businessId: string;
  /** @gotags: dynamodbav:"businessEmail" */
  businessEmail: string;
  /** @gotags: dynamodbav:"accountingEmail" */
  accountingEmail: string;
  /** @gotags: dynamodbav:"customerServiceEmail" */
  customerServiceEmail: string;
  /** @gotags: dynamodbav:"highPriorityEmail" */
  highPriorityEmail: string;
  /** @gotags: dynamodbav:"avatarURL" */
  avatarURL: string;
  /** @gotags: dynamodbav:"adminEmail" */
  adminEmail: string;
  /** @gotags: dynamodbav:"createdAt" */
  createdAt: string;
  /** @gotags: dynamodbav:"updatedAt" */
  updatedAt: string;
  /** @gotags: dynamodbav:"deletedAt" */
  deletedAt: string;
  /** @gotags: dynamodbav:"phoneNumber" */
  phoneNumber:
    | phoneNumber
    | undefined;
  /** @gotags: dynamodbav:"needsAddressUpdate" */
  needsAddressUpdate: boolean;
  /** @gotags: dynamodbav:"needsDefaultPickupAddressUpdate" */
  needsDefaultPickupAddressUpdate: boolean;
  /** @gotags: dynamodbav:"needsDefaultDeliveryAddressUpdate" */
  needsDefaultDeliveryAddressUpdate: boolean;
  /** @gotags: dynamodbav:"billingAddress" */
  billingAddress:
    | address
    | undefined;
  /** @gotags: dynamodbav:"defaultPickupAddress" */
  defaultPickupAddress:
    | address
    | undefined;
  /** @gotags: dynamodbav:"defaultDeliveryAddress" */
  defaultDeliveryAddress:
    | address
    | undefined;
  /** @gotags: dynamodbav:"address" */
  address:
    | address
    | undefined;
  /** @gotags: dynamodbav:"allowBooking" */
  allowBooking: boolean;
  /** @gotags: dynamodbav:"bookingLimit" */
  bookingLimit: number;
  /** @gotags: dynamodbav:"disabled" */
  disabled: boolean;
  /** @gotags: dynamodbav:"referredBy" */
  referredBy: string;
  /** @gotags: dynamodbav:"accountCreditLimit" */
  accountCreditLimit: number;
  /** @gotags: dynamodbav:"priceTier" */
  priceTier: number;
  /** @gotags: dynamodbav:"booksOpened" */
  booksOpened: boolean;
  /** @gotags: dynamodbav:"adminUser" */
  adminUser:
    | user
    | undefined;
  /** @gotags: dynamodbav:"booksContactId" */
  booksContactId: string;
  /** @gotags: dynamodbav:"contactPersonsIds" */
  contactPersonsIds: string[];
}

export interface businesses {
  /** @gotags: dynamodbav:"businesses" */
  businesses: business[];
}
