import { browser } from '$app/environment';
import { get } from 'svelte/store';
import { parseAddress } from './parse_quote_address.js';
import { validateAddress } from '$src/lib/utils/validate_address.js';
import toast from 'svelte-french-toast';
import { bookShipmentErrorsStore } from '$src/routes/(admin)/admin/booking/[slug]/book.js';
import { deliveryStore } from '$src/components/quote/delivery_store.js';
import { pickupStore } from '../quote/pickup_store.js';
function initStreetAutocomplete() {
  if (browser) {
    const options = ['address_component', 'formatted_address', 'geometry', 'name'];
    function initPickupStreetAutocomplete() {
      // @ts-expect-error
      const pickupInput = document.getElementById('pickupStreet');
      // @ts-expect-error
      const autocomplete_pickup = new google.maps.places.Autocomplete(pickupInput, options);
      autocomplete_pickup.addListener('place_changed', () => {
        const place = autocomplete_pickup.getPlace();
        const parsedAddress = parseAddress(place);
        const pickupAddress = get(pickupStore);
        const isValidAddress = validateAddress(pickupAddress.address, parsedAddress);
        if (isValidAddress) {
          if (pickupAddress.address.zipCode != parsedAddress.zipCode) {
            toast.error('Quote Pickup Zip Code does not match with book Pickup Zip Code');
            bookShipmentErrorsStore.update((value) => {
              value.pickupStreetAddress.valid = false;
              return value;
            });
            return;
          }
          pickupStore.update((value) => {
            if (value && value.address) {
              value.address.addressLine1 = parsedAddress.addressLine1;
              value.address.city = parsedAddress.city;
              value.address.state = parsedAddress.state;
              value.address.stateCode = parsedAddress.stateCode;
              value.address.country = parsedAddress.country;
              value.address.countryCode = parsedAddress.countryCode;
              value.address.zipCode = parsedAddress.zipCode;
            }
            bookShipmentErrorsStore.update((value) => {
              value.pickupStreetAddress.valid = true;
              return value;
            });
            return value;
          });
        } else {
          bookShipmentErrorsStore.update((value) => {
            value.pickupStreetAddress.valid = false;
            return value;
          });
          pickupStore.update((value) => {
            if (value && value.address) {
              value.address.addressLine1 = '';
            }
            return value;
          });
        }
      });
    }

    function initDeliveryStreetAutocomplete() {
      // @ts-expect-error
      const deliveryInput = document.getElementById('deliveryStreet');
      // @ts-expect-error
      const autocomplete_delivery = new google.maps.places.Autocomplete(deliveryInput, options);
      autocomplete_delivery.addListener('place_changed', () => {
        const place = autocomplete_delivery.getPlace();
        const parsedAddress = parseAddress(place);
        const delivery = get(deliveryStore);
        const isValidAddress = validateAddress(delivery.address, parsedAddress);
        if (isValidAddress) {
          if (delivery.address.zipCode != parsedAddress.zipCode) {
            toast.error('Quote delivery Zip Code does not match with book delivery Zip Code');
            bookShipmentErrorsStore.update((value) => {
              value.deliveryStreetAddress.valid = false;
              return value;
            });
            deliveryStore.update((value) => {
              if (value && value.address) {
                value.address.addressLine1 = '';
              }
              return value;
            });
            return;
          }
          deliveryStore.update((value) => {
            if (value && value.address) {
              value.address.addressLine1 = parsedAddress.addressLine1;
              value.address.city = parsedAddress.city;
              value.address.state = parsedAddress.state;
              value.address.stateCode = parsedAddress.stateCode;
              value.address.country = parsedAddress.country;
              value.address.countryCode = parsedAddress.countryCode;
              value.address.zipCode = parsedAddress.zipCode;
            }
            bookShipmentErrorsStore.update((value) => {
              value.deliveryStreetAddress.valid = true;
              return value;
            });
            return value;
          });
        } else {
          bookShipmentErrorsStore.update((value) => {
            value.deliveryStreetAddress.valid = false;
            return value;
          });
          deliveryStore.update((value) => {
            if (value && value.address) {
              value.address.addressLine1 = '';
            }
            return value;
          });
        }
      });
    }
    return { initPickupStreetAutocomplete, initDeliveryStreetAutocomplete };
  } else {
    return { initPickupStreetAutocomplete: () => {}, initDeliveryStreetAutocomplete: () => {} };
  }
}
export const { initPickupStreetAutocomplete, initDeliveryStreetAutocomplete } =
  initStreetAutocomplete();
