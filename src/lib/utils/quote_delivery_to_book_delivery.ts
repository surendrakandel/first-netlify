import type { location } from '$src/types/location';

export function quoteDeliveryToBookDelivery(delivery: location) {
  const delivryWithErr = {
    id: delivery?.id,
    company_name: delivery?.companyName,
    address: delivery?.address,
    contact: delivery?.contact,
    business_hours: delivery?.businessHours,
    DELIVERY_LOCATION_NONE: false
    //     DELIVERY_LOCATION_WITH_DOCK: delivery?.deliveryLocationServices.includes(delivery.deliveryLocationServices),
    //     LIFTGATE_DELIVERY: delivery?.delivery_location_services.includes(delivery_location_services.LIFTGATE_DELIVERY),
    //     DELIVERY_APPOINTMENT: delivery?.delivery_location_services.includes(delivery_location_services.DELIVERY_APPOINTMENT),
    //     INSIDE_DELIVERY: delivery?.delivery_location_services.includes(delivery_location_services.INSIDE_DELIVERY),
    //     DELIVERY_NOTIFICATION: delivery?.delivery_location_services.includes(delivery_location_services.DELIVERY_NOTIFICATION),
    //     receiver_instructions: delivery?.receiver_instructions,
    //     delivery_location_services: delivery?.delivery_location_services,
    //     type: delivery?.type,
    //     delivery_address_zip_code_error: makeInfo({
    //         valid: true,
    //         id:"pickup_address_zip_code",
    //         error_message: "pickup zipcode is not valid or empty.",
    //         clas: "err",
    //         path: "pick"
    //     }),
    //     delivery_address_street_error: makeInfo({
    //         valid: true,
    //         id: 'pickup_street_error',
    //         error_message: 'pickup street is required.',
    //         clas: "err",
    //         path:""
    //     }),
    //     delivery_address_city_error: makeInfo({
    //         valid: true,
    //         id:'pickup_city_error',
    //         error_message: 'pickup city is required.',
    //         clas: "err",
    //         path:""
    //     }),
    //     delivery_address_state_error: makeInfo({
    //         valid: true,
    //         id: 'pickup_state_error',
    //         error_message: 'pickup state is required.',
    //         clas: "err",
    //         path: ""
    //     }),
    //     delivery_zipcode_mismatch_error: makeInfo({
    //         valid: true,
    //         id: 'pickup_zipcode_mismatch_err',
    //         error_message: 'quote pickup zipcode and current zipcode does not match. please verify pickup zipcode or update the quote.',
    //         clas: "err",
    //         path: ""
    //     }),
    //     delivery_additional_services_error: makeInfo({
    //         valid: true,
    //         id: "pickup_location_services",
    //         error_message: "please choose if liftgate is required at pickup or choose if business with liftgate.",
    //         clas: "err",
    //         path: ""
    //     }),
    //     delivery_by_error: makeInfo({
    //         valid: true,
    //         id: 'pickup_by_error',
    //         error_message: 'pickup by time is required.',
    //         clas: "err",
    //         path: ""
    //     }),
    //     receiver_first_name_error: makeInfo({
    //         valid: true,
    //         id: 'shipper_first_name_error',
    //         error_message: 'receiver first name is required.',
    //         clas: "err",
    //         path: ""

    //     }),
    //     receiver_last_name_error: makeInfo({
    //         valid: true,
    //         id: 'shipper_last_name_error',
    //         error_message: 'receiver last name is required.',
    //         clas: "err",
    //         path: "",
    //     }),
    //     receiver_email_error: makeInfo({
    //         valid: true,
    //         id: 'shipper_email_error',
    //         error_message: 'receiver email address is required.',
    //         clas: "err",
    //         path: ""
    //     }),
    //     receiver_phone_number_error: makeInfo({
    //         valid: true,
    //         id:'shipper_phone_number_error',
    //         error_message: 'receiver phone number is required.',
    //         clas: "err",
    //         path: ""
    //     }),
    //     receiver_company_name_error: makeInfo({
    //         valid: true,
    //         id: 'shipper_company_name_error',
    //         error_message: 'receiver company name is required.',
    //         clas: "err",
    //         path: ""
    //     }),
    //     delivery_date_error: makeInfo({
    //         valid: true,
    //         id: 'pickup_date_error',
    //         error_message: 'pickup date is not valid or falls on weekend or holiday. Please choose another date.',
    //         clas: "err",
    //         path: ""
    //     }),
    // }
    // return delivryWithErr
  };
}
