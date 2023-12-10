import type { location } from '$src/types/location';

interface pickup_services {
  value: string;
  label: string;
  id: string;
}

export function getSelectedPickupService(pickup: location) {
  // let  services:pickup_services[] = []
  // if(pickup.){
  //     services.push({
  //         value: "LIFTGATE_PICKUP",
  //         id: "LIFTGATE_PICKUP",
  //         label: "Liftgate Pickup"
  //     })
  // }
  // if(pickup.PICKUP_LOCATION_WITH_DOCK){
  //     services.push({
  //         value: "PICUP_LOCATION_WITH_DOCK",
  //         id: "PICUP_LOCATION_WITH_DOCK",
  //         label: "Pickup Location With Dock"
  //     })
  // }
  // if(pickup.PICKUP_APPOINTMENT){
  //     services.push({
  //         value: "PICKUP_APPOINTMENT",
  //         id: "PICKUP_APPOINTMENT",
  //         label: "Pickup Appointment"
  //     })
  // }
  // if(pickup.INSIDE_PICKUP){
  //     services.push({
  //         value: "INSIDE_PICKUP",
  //         id: "INSIDE_PICKUP",
  //         label: "Inside Pickup"
  //     })
  // }
  // if(pickup.PICKUP_NOTIFICATION){
  //     services.push({
  //         value: "PICKUP_NOTICATION",
  //         id: "PICKUP_NOTICATION",
  //         label: "Pickup Notification"
  //     })
  // }
  // return services
}
