import type { business } from '$src/types/business';

export function newBusiness(): business {
  const newBusiness: business = {
    type: '',
    businessName: '',
    businessId: '',
    businessEmail: '',
    accountingEmail: '',
    customerServiceEmail: '',
    highPriorityEmail: '',
    adminEmail: '',
    createdAt: '',
    deletedAt: '',
    needsAddressUpdate: false,
    needsDefaultPickupAddressUpdate: false,
    needsDefaultDeliveryAddressUpdate: false,
    avatarURL: '',
    updatedAt: '',
    phoneNumber: undefined,
    billingAddress: undefined,
    defaultPickupAddress: undefined,
    defaultDeliveryAddress: undefined,
    address: undefined,
    allowBooking: false,
    bookingLimit: 0,
    disabled: false,
    referredBy: '',
    accountCreditLimit: 0,
    priceTier: 0,
    booksOpened: false,
    adminUser: undefined,
    booksContactId: '',
    contactPersonsIds: []
  };
  return newBusiness;
}
