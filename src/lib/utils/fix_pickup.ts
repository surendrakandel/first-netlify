import type { quoteRequest } from '$src/types/quote';
import type { Writable } from 'svelte/store';

export function fixPickup(quote_request: Writable<quoteRequest>) {
  try {
    quote_request.update((value) => {
      // let services :pickupLocationServices[] = []
      // if(value.pickup.pickupLocationServices){
      //     services.push(pickup_location_servicesFromJSON("PICKUP_APPOINTMENT"))
      // }
      // if(value.pickup.PICKUP_LOCATION_WITH_DOCK){
      //     services.push(pickup_location_servicesFromJSON("PICKUP_LOCATION_WITH_DOCK"))
      // }
      // if(value.pickup.LIFTGATE_PICKUP){
      //     services.push(pickup_location_servicesFromJSON("LIFTGATE_PICKUP"))
      // }
      // if(value.pickup.PICKUP_NOTIFICATION){
      //     services.push(pickup_location_servicesFromJSON("PICKUP_NOTIFICATION"))
      // }
      // if(value.pickup.INSIDE_PICKUP){
      //     services.push(pickup_location_servicesFromJSON("INSIDE_PICKUP"))
      // }
      // value.pickup.pickup_location_services = services
      return value;
    });
  } catch (error) {
    console.debug('error converting pickup location services');
  }
}
