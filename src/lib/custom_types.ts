import type { bid } from '$src/types/bid';
import type { bookingResponse } from '$src/types/book';
import type { business } from '$src/types/business';
import type { location } from '$src/types/location';
import type { quoteRequest, quoteResponse } from '$src/types/quote';
import type { user } from '$src/types/user';
import { getNewCommodity } from './utils/newCommodity';
import { getNewLocation } from './utils/new_location';
import { newShipmentInfo } from './utils/new_shipment_info';

export interface bookingPageData {
	bid: bid;
	quoteRequest: quoteRequest;
}
export const newQuoteResponse = (): quoteResponse => {
	const bidData: bid = {
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
	const data: quoteResponse = {
		bids: [bidData],
		quoteRequest: {
			shipmentInfo: newShipmentInfo(),
			commodities: [getNewCommodity(0)],
			pickup: getNewLocation(),
			delivery: getNewLocation()
		},
		success: false
	};
	return data;
};

export interface BasicInfo {
	token: string;
	business: business | undefined;
	user: user | undefined;
	users: user[];
	valid: boolean;
	clientAddresses: location[];
	businessAddress: location | undefined;
	defaultPickupLocation: location | undefined;
	defaultDeliveryLocation: location | undefined;
	bookings: bookingResponse[];
	quotes: quoteRequest[];
	shipments: bookingResponse[];
}
export interface jobPostType {
	title: string;
	features: string[];
	department: string;
	description: string;
	requirements: string;
	benefits: string;
	apply: string;
	posted: string;
	updated: string;
	posted_date: string;
}

export interface AppMetadata {
	provider: string;
	providers: string[];
}

export interface UserMetadata {
	confirmPassword: string;
	email: string;
	name: string;
	orgId: string;
	password: string;
	userName: string;
}

export interface IdentityData {
	email: string;
	sub: string;
}

export interface Identity {
	id: string;
	user_id: string;
	identity_data: IdentityData;
	provider: string;
	last_sign_in_at: Date;
	created_at: Date;
	updated_at: Date;
}

export interface User {
	id: string;
	aud: string;
	role: string;
	email: string;
	email_confirmed_at: Date;
	phone: string;
	confirmation_sent_at: Date;
	confirmed_at: Date;
	last_sign_in_at: Date;
	app_metadata: AppMetadata;
	user_metadata: UserMetadata;
	identities: Identity[];
	created_at: Date;
	updated_at: Date;
}

export interface LoginResponse {
	access_token: string;
	refresh_token: string;
	user: User | undefined;
	token_type: string;
	expires_in: number;
	expires_at: number;
}
export interface errorInfo {
	message: string;
	valid: boolean;
}
