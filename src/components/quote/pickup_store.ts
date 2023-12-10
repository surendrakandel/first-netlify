import { browser } from '$app/environment';
import type { errorInfo } from '$src/lib/custom_types';
import { getNewLocation } from '$src/lib/utils/new_location';
import type { location, locationType } from '$src/types/location';
import { get, writable, type Writable } from 'svelte/store';

export interface quotePickupErrors {
  pickupZipCode: errorInfo;
  pickupLocationServices: errorInfo;
}

export interface pickupLocationWorker {
  pickupStore: Writable<location>;
  quotePickupErrorsStore: Writable<quotePickupErrors>;
}
interface locationObjectType {
  locationType: locationType;
  name: string;
  value: string;
}
function initPickupLocationWorker(): pickupLocationWorker {
  let pickupStore: Writable<location> = writable(getNewLocation());
  let backupAddress: location = getNewLocation();
 
    if (browser) {
       let isEdit = localStorage.getItem('isEdit') || false;
       if (isEdit  && isEdit != "" ||isEdit != "false" && isEdit== "true") {
        backupAddress = localStoragePickupLocation();
        pickupStore.set(backupAddress);
       }
      pickupStore.subscribe((val) => {
        localStorage.setItem('currentPickupLocation', JSON.stringify(val));
    });
  };
  const quotePickupErrorsStore: Writable<quotePickupErrors> = writable({
    pickupZipCode: {
      valid: true,
      message: 'pickup zip code is invalid'
    },
    pickupLocationServices: {
      valid: true,
      message: 'please choose LiftGate Pickup or Location with Loading Dock'
    }
  });
  return {
    pickupStore,
    quotePickupErrorsStore
  };
}
export const { pickupStore, quotePickupErrorsStore } = initPickupLocationWorker();
function localStoragePickupLocation(): location {
  if (browser) {
    try {
      const currentPickupLocationStr = localStorage.getItem('currentPickupLocation') || JSON.stringify(getNewLocation());
      const currentPickupLocation: location = JSON.parse(currentPickupLocationStr);
      return currentPickupLocation;
    } catch (error) {
      return getNewLocation();
    }
  } else {
    return getNewLocation();
  }
}

// unknownLocationType = 0,
// businessWithLoadingDockOrForkLift = 1,
// businessWithOutLoadingDockOrForkLift = 2,
// residential = 3,
// tradeshow = 4,
// selfStorage = 5,
// airport = 6,
// church = 7,
// hospital = 8,
// school = 9,
// goverment = 10,
// fairOrAmusementPark = 11,
// constructionSite = 12,
// farmOrRanch = 13,
// militaryInstalation = 14,
// prison = 15,
// hotelOrMotel = 16,
// campGround = 17,
// groceryWarehouse = 18,
// countryClub = 19,
// mineSite = 20,
// nativeAmericanReservation = 21,
// nursingHome = 22,
// pier = 23,
// resort = 24,
// UNRECOGNIZED = -1,
export function getLocationTypes(): locationObjectType[] {
  const locationObject: locationObjectType[] = [
    {
      locationType: 0,
      name: 'Please select a location type',
      value: 'unknownLocationType'
    },
    {
      locationType: 1,
      name: 'Business with Loading Dock or Forklift',
      value: 'businessWithLoadingDockOrForkLift'
    },
    {
      locationType: 2,
      name: 'Business without Loading Dock or Forklift',
      value: 'businessWithOutLoadingDockOrForkLift'
    },
    {
      locationType: 3,
      name: 'Residential',
      value: 'residential'
    },
    {
      locationType: 4,
      name: 'Tradeshow',
      value: 'tradeshow'
    },
    {
      locationType: 5,
      name: 'Self Storage',
      value: 'selfStorage'
    },
    {
      locationType: 6,
      name: 'Airport',
      value: 'airport'
    },
    {
      locationType: 7,
      name: 'Church',
      value: 'church'
    },
    {
      locationType: 8,
      name: 'Hospital',
      value: 'hospital'
    },
    {
      locationType: 9,
      name: 'School',
      value: 'school'
    },
    {
      locationType: 10,
      name: 'Government',
      value: 'government'
    },
    {
      locationType: 11,
      name: 'Fair or Amusement Park',
      value: 'fairOrAmusementPark'
    },
    {
      locationType: 12,
      name: 'Construction Site',
      value: 'constructionSite'
    },
    {
      locationType: 13,
      name: 'Farm or Ranch',
      value: 'farmOrRanch'
    },
    {
      locationType: 14,
      name: 'Military Installation',
      value: 'militaryInstallation'
    },
    {
      locationType: 15,
      name: 'Prison',
      value: 'prison'
    },
    {
      locationType: 16,
      name: 'Hotel or Motel',
      value: 'hotelOrMotel'
    },
    {
      locationType: 17,
      name: 'Campground',
      value: 'campground'
    },
    {
      locationType: 18,
      name: 'Grocery Warehouse',
      value: 'groceryWarehouse'
    },
    {
      locationType: 19,
      name: 'Country Club',
      value: 'countryClub'
    },
    {
      locationType: 20,
      name: 'Mine Site',
      value: 'mineSite'
    },
    {
      locationType: 21,
      name: 'Native American Reservation',
      value: 'nativeAmericanReservation'
    },
    {
      locationType: 22,
      name: 'Nursing Home',
      value: 'nursingHome'
    },
    {
      locationType: 23,
      name: 'Pier',
      value: 'pier'
    },
    {
      locationType: 24,
      name: 'Resort',
      value: 'resort'
    }
  ];
  return locationObject;
}
export function resetPickupLocation() {
  pickupStore.set(getNewLocation());
}
export function editPickupLocation() {
  pickupStore.set(localStoragePickupLocation());
}

export function updatePickupLocation(location: location) {
  pickupStore.set(location);
}
