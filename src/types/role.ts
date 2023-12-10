/* eslint-disable */

export const protobufPackage = "v1";

export enum role {
  unknownRole = 0,
  adminRole = 1,
  userRole = 2,
  staffRole = 3,
  cashierRole = 4,
  managerRole = 5,
  systemAdminRole = 6,
  systemStaffRole = 7,
  systemManagerRole = 8,
  UNRECOGNIZED = -1,
}

export interface updateUserRole {
  /** @gotags: dynamodbav:"token,omitempty" */
  token: string;
  /** @gotags: dynamodbav:"newRole,omitempty" */
  newRole: role[];
  /** @gotags: dynamodbav:"staffEmail,omitempty" */
  staffEmail: string;
}
