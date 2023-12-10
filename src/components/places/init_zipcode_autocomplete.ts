import { browser } from '$app/environment';
import { getNewAddress } from '$src/lib/utils/new_address';
import { get } from 'svelte/store';
import { page } from '$app/stores';
import { parseAddress } from './parse_quote_address';
import { bookShipmentErrorsStore } from '$src/routes/(admin)/admin/booking/[slug]/book';

import { deliveryStore, quoteDeliveryErrorsStore } from '$src/components/quote/delivery_store';
import { pickupStore, quotePickupErrorsStore } from '../quote/pickup_store';
function initQuoteAutocompleteAddress() {
  if (browser) {
    const options = ['address_component', 'formatted_address', 'geometry', 'name'];
    function initPickUpZipCode() {
      const pickupInput = document.getElementById('pickupZipCode');
      // @ts-expect-error
      const autocomplete_pickup = new google.maps.places.Autocomplete(pickupInput, options);
      return autocomplete_pickup.addListener('place_changed', () => {
        const place = autocomplete_pickup.getPlace();
        const address = parseAddress(place);
        const isnum = /^\d+$/.test(address.zipCode);
        const pageData = get(page);
        const pickup = get(pickupStore);
        if (isnum && address.zipCode.length == 5) {
          pickupStore.update((value) => {
            if (value && value.address) {
              value.address = getNewAddress();
              value.address.zipCode = address.zipCode;
              quotePickupErrorsStore.update((value) => {
                value.pickupZipCode.valid = true;
                return value;
              });
            }
            return value;
          });
        }
        else if(address.zipCode.length !=  5 && pageData.url.pathname != '/admin/quote'){
          pickupStore.update((value) => {
            if (value && value.address) {
              value.address = getNewAddress();
            };
            return value
          });
          quotePickupErrorsStore.update((value) => {
            value.pickupZipCode.valid = false;
            return value;
          });
        }
        else if (isnum && address.zipCode.length == 5 && pageData.url.pathname == '/admin/quote') {
          pickupStore.update((value) => {
            if (value && value.address) {
              value.address = getNewAddress();
              value.address.zipCode = address.zipCode;
              quotePickupErrorsStore.update((value) => {
                value.pickupZipCode.valid = true;
                return value;
              });
            }
            return value;
          });
        } else if (
          pickup?.address?.zipCode == address.zipCode &&
          pageData.url.pathname == '/admin/book'
        ) {
          pickupStore.update((value) => {
            if (value && value.address) {
              value.address.addressLine1 = address.addressLine1;
              value.address.city = address.city;
              value.address.state = address.state;
              value.address.stateCode = address.stateCode;
              value.address.country = address.country;
              value.address.countryCode = address.countryCode;
              value.address.zipCode = address.zipCode;
              bookShipmentErrorsStore.update((value) => {
                value.pickupZipCode.valid = true;
                return value;
              });
              quotePickupErrorsStore.update((value) => {
                value.pickupZipCode.valid = true;
                return value;
              });
            }
            return value;
          });
        } else {
          pickupStore.update((value) => {
            if (value && value.address) {
              value.address = getNewAddress();
              bookShipmentErrorsStore.update((value) => {
                value.pickupZipCode.valid = false;
                return value;
              });
              quotePickupErrorsStore.update((value) => {
                value.pickupZipCode.valid = false;
                return value;
              });
            }
            return value;
          });
        }
      });
    }

    function initDeliveryZipCode() {
      const deliveryInput = document.getElementById('deliveryZipCode');
      // @ts-expect-error
      const autocomplete_delivery = new google.maps.places.Autocomplete(deliveryInput, options);
      return autocomplete_delivery.addListener('place_changed', () => {
        const place = autocomplete_delivery.getPlace();
        const address = parseAddress(place);
        const isnum = /^\d+$/.test(address.zipCode);
        const delivery = get(deliveryStore);
        const pageData = get(page);
        if (isnum && address.zipCode.length == 5 && pageData.url.pathname != '/admin/quote') {
          deliveryStore.update((value) => {
            if (value && value.address) {
              value.address = getNewAddress();
              value.address.zipCode = address.zipCode;
              quoteDeliveryErrorsStore.update((value) => {
                value.deliveryZipCode.valid = true;
                return value;
              });
            }
            return value;
          });

        }else if(address.zipCode.length != 5 && pageData.url.pathname != '/admin/quote'){
          deliveryStore.update((value) => {
            if (value && value.address) {
              value.address = getNewAddress();
            };
            return value
          });
          quoteDeliveryErrorsStore.update((value) => {
            value.deliveryZipCode.valid = false;
            return value;
          });
        }
        else if (isnum && address.zipCode.length == 5 && pageData.url.pathname == '/admin/quote') {
          deliveryStore.update((value) => {
            if (value && value.address) {
              value.address = getNewAddress();
              value.address.zipCode = address.zipCode;
              quoteDeliveryErrorsStore.update((value) => {
                value.deliveryZipCode.valid = true;
                return value;
              });
            }
            return value;
          });
        } else if (
          delivery?.address?.zipCode == address.zipCode &&
          pageData.url.pathname == '/admin/book'
        ) {
          deliveryStore.update((value) => {
            if (value && value.address) {
              value.address.addressLine1 = address.addressLine1;
              value.address.city = address.city;
              value.address.state = address.state;
              value.address.stateCode = address.stateCode;
              value.address.country = address.country;
              value.address.countryCode = address.countryCode;
              value.address.zipCode = address.zipCode;
              bookShipmentErrorsStore.update((value) => {
                value.deliveryStreetAddress.valid = true;
                return value;
              });
              quoteDeliveryErrorsStore.update((value) => {
                value.deliveryZipCode.valid = true;
                return value;
              });
            }
            return value;
          });
        } else {
          deliveryStore.update((value) => {
            if (value && value.address) {
              value.address = getNewAddress();
              bookShipmentErrorsStore.update((value) => {
                value.deliveryStreetAddress.valid = false;
                return value;
              });
              quoteDeliveryErrorsStore.update((value) => {
                value.deliveryZipCode.valid = false;
                return value;
              });
            }
            return value;
          });
        }
      });
    }
    return { initPickUpZipCode, initDeliveryZipCode };
  } else {
    return { initPickUpZipCode: () => {}, initDeliveryZipCode: () => {} };
  }
}

export const { initPickUpZipCode, initDeliveryZipCode } = initQuoteAutocompleteAddress();
