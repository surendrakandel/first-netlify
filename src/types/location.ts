/* eslint-disable */
import type { address } from "./address";
import type { businessHours } from "./business_hours";
import type { contact } from "./contact";

export const protobufPackage = "v1";

export enum locationType {
  unknownLocationType = 0,
  businessWithLoadingDockOrForkLift = 1,
  businessWithOutLoadingDockOrForkLift = 2,
  residential = 3,
  tradeshow = 4,
  selfStorage = 5,
  airport = 6,
  church = 7,
  hospital = 8,
  school = 9,
  goverment = 10,
  fairOrAmusementPark = 11,
  constructionSite = 12,
  farmOrRanch = 13,
  militaryInstalation = 14,
  prison = 15,
  hotelOrMotel = 16,
  campGround = 17,
  groceryWarehouse = 18,
  countryClub = 19,
  mineSite = 20,
  nativeAmericanReservation = 21,
  nursingHome = 22,
  pier = 23,
  resort = 24,
  UNRECOGNIZED = -1,
}

export enum locationService {
  unknownLocationService = 0,
  hasLoadingDock = 1,
  liftgate = 2,
  insideAccess = 3,
  appointment = 4,
  UNRECOGNIZED = -1,
}

export interface location {
  /** @gotags: dynamodbav:"id,omitempty" */
  id: string;
  /** @gotags: dynamodbav:"companyName,omitempty" */
  companyName: string;
  /** @gotags: dynamodbav:"address,omitempty" */
  address:
    | address
    | undefined;
  /** @gotags: dynamodbav:"contact,omitempty" */
  contact:
    | contact
    | undefined;
  /** @gotags: dynamodbav:"businessHours,omitempty", */
  businessHours:
    | businessHours
    | undefined;
  /** @gotags: dynamodbav:"businessId,omitempty" */
  businessId: string;
  /** @gotags: dynamodbav:"type,omitempty" */
  type: string;
  /** @gotags: dynamodbav:"instructions,omitempty" */
  instructions: string;
  /** @gotags: dynamodbav:"openTime,omitempty" */
  openTime: string;
  /** @gotags: dynamodbav:"closeTime,omitempty" */
  closeTime: string;
  /** @gotags: dynamodbav:"appointmentTime,omitempty" */
  appointmentTime: string;
  /** @gotags: dynamodbav:"isAppointmentRequired,omitempty" */
  isAppointmentRequired: boolean;
  /** @gotags: dynamodbav:"locationType,omitempty" */
  locationType: locationType;
  /** @gotags: dynamodbav:"locationServices,omitempty" */
  locationServices: locationService[];
}

export interface locations {
  /** @gotags: dynamodbav:"locations,omitempty" */
  Locations: location[];
}
