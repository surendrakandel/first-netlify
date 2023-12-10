import { freightChargeTerm, type bookingInfo } from '$src/types/book';

export function newBooking(): bookingInfo {
  const booking: bookingInfo = {
    firstShipperBolNumber: '',
    freightTerm: freightChargeTerm.CHARGENONE,
    carrierName: '',
    carrierProNumber: '',
    carrierLogoUrl: '',
    carrierBolNumber: '',
    carrierReference: '',
    shipmentId: 0,
    carrierPhone: '',
    carrierEmail: '',
    pickupNumber: '',
    serviceType: '',
    bolUrl: '',
    svgData: ''
  };
  return booking;
}
