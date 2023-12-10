export interface carrierContact {
  name: string;
  phone: string;
  email: string;
  cancel_pickup_email: string;
  cancel_pickup_phone: string;
  dispatch_email: string;
  dispatch_phone: string;
}

export const getCarrierContact = (carrier: string): carrierContact => {
  switch (carrier) {
    case 'XPO LTL':
      return {
        name: 'XPO',
        phone: '213-744-0664',
        email: 'ltlccg@xpo.com',
        cancel_pickup_email: 'ltlccg@xpo.com',
        cancel_pickup_phone: '213-744-0664',
        dispatch_email: 'ltlccg@xpo.com',
        dispatch_phone: '213-744-0664'
      };
    case 'ROADRUNNER':
      return {
        name: 'RoadRunner',
        phone: '1-951-361-5900',
        email: 'laxcustser@roadrunnerLTL.com',
        cancel_pickup_email: 'fedex.com',
        cancel_pickup_phone: '1-951-361-5900',
        dispatch_email: 'laxcustser@roadrunnerLTL.com',
        dispatch_phone: '1-951-361-5900'
      };
    case 'CLEARLANE':
      return {
        name: 'USPS',
        phone: '1-866-491-9255',
        email: 'customerservice@clearlanefreight.com',
        cancel_pickup_email: 'customerservice@clearlanefreight.com',
        cancel_pickup_phone: '1-866-491-9255',
        dispatch_email: 'customerservice@clearlanefreight.com',
        dispatch_phone: '1-866-491-9255'
      };
    default:
      return {
        name: 'FirstShipper Logistics',
        phone: '1-713-516-2836',
        email: 'bookings@firstshipper.com',
        cancel_pickup_email: 'bookings@firstshipper.com',
        cancel_pickup_phone: '713-516-2836',
        dispatch_email: 'bookings@firstshipper.com',
        dispatch_phone: '1-713-516-2836'
      };
  }
};
