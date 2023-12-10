/* eslint-disable */

export const protobufPackage = "v1";

export enum commodityService {
  unknownCommodityService = 0,
  protectFromFreeze = 1,
  sortAndSegregate = 2,
  guaranteed = 3,
  hazardous = 4,
  stackable = 5,
  UNRECOGNIZED = -1,
}

export enum packageType {
  unknownPackageType = 0,
  pallets48x40 = 1,
  pallets48x48 = 2,
  bags = 3,
  bales = 4,
  boxes = 5,
  buckets = 6,
  bundles = 7,
  cans = 8,
  cartons = 9,
  cases = 10,
  coils = 11,
  crates = 12,
  cylinders = 13,
  drums = 14,
  pails = 15,
  reels = 16,
  rolls = 17,
  totes = 18,
  tubes = 19,
  units = 20,
  UNRECOGNIZED = -1,
}

export enum freightClass {
  unknownFreightClass = 0,
  class50 = 1,
  class55 = 2,
  class60 = 3,
  class65 = 4,
  class70 = 5,
  class775 = 6,
  class85 = 7,
  class925 = 8,
  class100 = 9,
  class110 = 10,
  class125 = 11,
  class150 = 12,
  class175 = 13,
  class200 = 14,
  class250 = 15,
  class300 = 16,
  class400 = 17,
  class500 = 18,
  UNRECOGNIZED = -1,
}

export interface dimensionUOM {
  /** @gotags: dynamodbav:"INCH,omitempty" */
  INCH: boolean;
  /** @gotags: dynamodbav:"CM,omitempty" */
  CM: boolean;
}

export interface weightUOM {
  /** @gotags: dynamodbav:"LB,omitempty" */
  LB: boolean;
  /** @gotags: dynamodbav:"KG,omitempty" */
  KG: boolean;
}

export interface commodity {
  /** @gotags: dynamodbav:"density,omitempty" */
  density: number;
  /** @gotags: dynamodbav:"length,omitempty" */
  length: number;
  /** @gotags: dynamodbav:"width,omitempty" */
  width: number;
  /** @gotags: dynamodbav:"height,omitempty" */
  height: number;
  /** @gotags: dynamodbav:"weight,omitempty" */
  weight: number;
  /** @gotags: dynamodbav:"dimensionUOM,omitempty" */
  dimensionUOM:
    | dimensionUOM
    | undefined;
  /** @gotags: dynamodbav:"weightUOM,omitempty" */
  weightUOM:
    | weightUOM
    | undefined;
  /** @gotags: dynamodbav:"dimensionDisplay,omitempty" */
  dimensionDisplay: string;
  /** @gotags: dynamodbav:"packageType,omitempty" */
  packageType: packageType;
  /** @gotags: dynamodbav:"quantity,omitempty" */
  quantity: number;
  /** @gotags: dynamodbav:"freightClass,omitempty" */
  freightClass: freightClass;
  /** @gotags: dynamodbav:"instructions,omitempty" */
  instructions: string;
  /** @gotags: dynamodbav:"index,omitempty" */
  index: number;
  /** @gotags: dynamodbav:"description,omitempty" */
  description: string;
  /** @gotags: dynamodbav:"commodityServices,omitempty" */
  commodityServices: commodityService[];
}
