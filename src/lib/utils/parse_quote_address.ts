import { getNewAddress } from '$src/lib/utils/new_address';
import type { address } from '$src/types/address';

export function parseAddress(address: any): address {
  if (address?.address_components?.length == 0) return getNewAddress();
  function findShortNames(place: any, name: string) {
    const component = place.address_components.find((c: any) => c.types.includes(name));
    return component ? component.short_name : '';
  }
  function findLongNames(place: any, name: string) {
    try {
      const component = place.address_components.find((c: { types: string | any[] }): any => {
        return c.types.includes(name);
      });
      return component ? component.long_name : '';
    } catch (error) {
      console.debug(error);
    }
  }

  const data: address = {
    addressLine1:
      findLongNames(address, 'street_number') + ' ' + findLongNames(address, 'route')?.trim(),
    addressLine2: '',
    city: findLongNames(address, 'locality')?.trim(),
    county: findLongNames(address, 'administrative_area_level_2')?.trim(),
    state: findLongNames(address, 'administrative_area_level_1')?.trim(),
    stateCode: findShortNames(address, 'administrative_area_level_1')?.trim(),
    country: findLongNames(address, 'country')?.trim(),
    countryCode: findShortNames(address, 'country')?.trim(),
    zipCode: findLongNames(address, 'postal_code')?.trim(),
    streetName: findLongNames(address, 'route')?.trim(),
    extendedZipCode: findLongNames(address, 'postal_code')?.trim(),
    freeFormAddress: (
      findLongNames(address, 'postal_code') +
      ', ' +
      findShortNames(address, 'locality') +
      ', ' +
      findShortNames(address, 'administrative_area_level_1')
    )?.trim(),
    localName: '',
    lat: address?.geometry?.location?.lat(),
    long: address?.geometry?.location?.lng(),
    businessId: '',
    type: ''
  };
  return data;
}
