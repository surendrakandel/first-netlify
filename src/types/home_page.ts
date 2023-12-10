/* eslint-disable */
import type { bookingResponse } from "./book";
import type { business } from "./business";
import type { frontEndUser } from "./user";

export const protobufPackage = "v1";

export interface homePageResponse {
  business: business | undefined;
  users: frontEndUser[];
  bookings: bookingResponse[];
}
