import type { address } from '$src/types/address';
import { isEnvDev } from '../config';

export function getNewAddress(): address {
  if(isEnvDev()){
    return {
      addressLine1: '',
      addressLine2: '',
      streetName: '',
      city: '',
      county: '',
      zipCode: '90013',
      state: '',
      stateCode: '',
      extendedZipCode: '',
      country: '',
      countryCode: '',
      freeFormAddress: '',
      localName: '',
      lat: 0,
      long: 0,
      businessId: '',
      type: ''
    };
  }else{
    return {
        addressLine1: '',
        addressLine2: '',
        streetName: '',
        city: '',
        county: '',
        zipCode: '',
        state: '',
        stateCode: '',
        extendedZipCode: '',
        country: '',
        countryCode: '',
        freeFormAddress: '',
        localName: '',
        lat: 0,
        long: 0,
        businessId: '',
        type: ''
      };
    }
}
