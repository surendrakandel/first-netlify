interface shipmentService {
  label: string;
  key: string;
  value: string;
}
export function getShipmentServices(): shipmentService[] {
  const locationServices: shipmentService[] = [
    {
      label: 'Please Choose Needed Services',
      key: 'none',
      value: '0'
    },
    {
      label: 'LiftGate Pickup',
      key: 'pickupLocationWithDock',
      value: 'pickupLocationWithDock'
    },
    {
      label: 'Pickup Location With Dock',
      key: 'liftGatePickup',
      value: 'liftGatePickup'
    },
    {
      label: 'Pickup Appointment',
      key: 'pickupAppointment',
      value: 'pickupAppointment'
    },
    {
      label: 'Inside Pickup',
      key: 'insidePickup',
      value: 'insidePickup'
    },
    {
      label: 'Pickup Notification',
      key: 'pickupNotification',
      value: 'pickupNotification'
    },
    {
      label: 'Pickup Location With Dock',
      key: 'deliveryLocationWithDock',
      value: 'deliveryLocationWithDock'
    },
    {
      label: 'Liftgate Delivery',
      key: 'liftGateDelivery',
      value: 'liftGateDelivery'
    },
    {
      label: 'Delivery Appointment',
      key: 'deliveryAppointment',
      value: 'deliveryAppointment'
    },
    {
      label: 'Inside Delivery',
      key: 'insideDelivery',
      value: 'insideDelivery'
    },
    {
      label: 'Delivery Notification',
      key: 'deliveryNotification',
      value: 'deliveryNotification'
    },
    {
      label: 'Protect From Freeze',
      key: 'protectFromFreeze',
      value: 'protectFromFreeze'
    },
    {
      label: 'Sort And Segregate',
      key: 'sortAndSegregate',
      value: 'sortAndSegregate'
    },
    {
      label: 'Guaranteed',
      key: 'guaranteed',
      value: 'guaranteed'
    },
    {
      label: 'Hazardous',
      key: 'hazardous',
      value: 'hazardous'
    },
    {
      label: 'Stackable',
      key: 'stackable',
      value: 'stackable'
    },
    {
      label: 'Public Storage Pickup',
      key: 'publicStoragePickup',
      value: 'publicStoragePickup'
    },
    {
      label: 'Public Storage Delivery',
      key: 'publicStorageDelivery',
      value: 'publicStorageDelivery'
    },
    {
      label: 'Residentail Pickup',
      key: 'residentialPickup',
      value: 'residentialPickup'
    },
    {
      label: 'Residential Delivery',
      key: 'residentialDelivery',
      value: 'residentialDelivery'
    },
    {
      label: 'Trade Show Pickup',
      key: 'tradeShowPickup',
      value: 'tradeShowPickup'
    },
    {
      label: 'Trade Show Delivery',
      key: 'tradeShowDelivery',
      value: 'tradeShowDelivery'
    }
  ];
  // let services: shipmentServices = {
  //   pickupLocationWithDock: false,
  //   liftGatePickup: false,
  //   pickupAppointment: false,
  //   insidePickup: false,
  //   pickupNotification: false,
  //   deliveryLocationWithDock: false,
  //   liftGateDelivery: false,
  //   deliveryAppointment: false,
  //   insideDelivery: false,
  //   deliveryNotification: false,
  //   protectFromFreeze: false,
  //   sortAndSegregate: false,
  //   guaranteed: false,
  //   hazardous: false,
  //   stackable: false,
  //   publicStoragePickup: false,
  //   publicStorageDelivery: false,
  //   residentialPickup: false,
  //   residentialDelivery: false,
  //   tradeShowPickup: false,
  //   tradeShowDelivery: false
  // };
  return locationServices;
}
