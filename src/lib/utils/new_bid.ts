import type { bid } from '$src/types/bid';

export function getNewBid(): bid {
  const bids: bid = {
    bidId: '',
    carrier: '',
    amount: undefined,
    transitTime: '',
    guranteed: false,
    vendorLogo: '',
    deliveryDate: '',
    vendorQuoteId: '',
    capacityProviderQuoteId: '',
    vendorName: '',
    carrierName: '',
    carrierCode: '',
    type: '',
    carrierQuoteId: '',
    quoteId: '',
    carrierID: 0,
    destination: '',
    origin: '',
    opportunityId: 0,
    serviceLevelCode: '',
    serviceName: '',
    serviceType: 0,
    shipmentId: '',
    platform: ''
  };
  return bids;
}
