import type { location } from '$src/types/location';
import { isEnvDev } from '../config';
import { getNewContact } from './getNewContact';
import { getNewAddress } from './new_address';
import { getNewBusinessHours } from './new_hours';

export function getNewLocation(): location {
  if(isEnvDev()){
    return {
      id: '',
      companyName: 'ramsford',
      address: getNewAddress(),
      contact: getNewContact(),
      businessHours: getNewBusinessHours(),
      businessId: '',
      type: '',
      instructions: 'instructions',
      openTime: '',
      closeTime: '',
      appointmentTime: '',
      isAppointmentRequired: false,
      locationType: 1,
      locationServices: [0]
    };
  }
  const loc: location = {
    id: '',
    companyName: '',
    address: getNewAddress(),
    contact: getNewContact(),
    businessHours: getNewBusinessHours(),
    businessId: '',
    type: '',
    instructions: '',
    openTime: '',
    closeTime: '',
    appointmentTime: '',
    isAppointmentRequired: false,
    locationType: 0,
    locationServices: []
  };
  return loc;
}
