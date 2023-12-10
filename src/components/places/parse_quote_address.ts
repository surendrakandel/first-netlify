import { getNewAddress } from '$src/lib/utils/new_address';
import type { address } from '$src/types/address';
function findShortNames(place: any, name: string): string {
  const component = place.address_components.find((c: any) => c.types.includes(name));
  return component ? component.short_name : '';
}
function findLongNames(place: any, name: string): string {
  try {
    const component = place.address_components?.find((c: { types: string | any[] }): any => {
      return c.types.includes(name);
    });
    return component ? component.long_name : '';
  } catch (error) {
    console.debug(error);
  }
  return '';
}
export function parseAddress(addressData: any): address {
  if (addressData?.address_components?.length == 0) return getNewAddress();
  const data: address = {
    addressLine1:
      findLongNames(addressData, 'street_number')?.toLowerCase() +
      ' ' +
      findLongNames(addressData, 'route')?.trim()?.toLowerCase(),
    addressLine2: '',
    city: findLongNames(addressData, 'locality')?.trim()?.toLowerCase(),
    county: findLongNames(addressData, 'administrative_area_level_2')?.trim()?.toLowerCase(),
    state: findLongNames(addressData, 'administrative_area_level_1')?.trim()?.toLowerCase(),
    stateCode: findShortNames(addressData, 'administrative_area_level_1')?.trim()?.toLowerCase(),
    country: findLongNames(addressData, 'country')?.trim()?.toLowerCase(),
    countryCode: findShortNames(addressData, 'country')?.trim()?.toLowerCase(),
    zipCode: findLongNames(addressData, 'postal_code')?.trim()?.toLowerCase(),
    streetName: findLongNames(addressData, 'route')?.trim()?.toLowerCase(),
    extendedZipCode: findLongNames(addressData, 'postal_code')?.trim()?.toLowerCase(),
    freeFormAddress: (
      findLongNames(addressData, 'postal_code') +
      ', ' +
      findShortNames(addressData, 'locality') +
      ', ' +
      findShortNames(addressData, 'administrative_area_level_1')
    )
      ?.trim()
      ?.toLowerCase(),
    localName: '',
    lat: addressData?.geometry?.location?.lat(),
    long: addressData?.geometry?.location?.lng(),
    businessId: '',
    type: ''
  };
  return data;
}
