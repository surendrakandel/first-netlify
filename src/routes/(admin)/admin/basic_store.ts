import { browser } from '$app/environment';
import { writable, get, type Writable } from 'svelte/store';
import type { basicInfo } from '$src/types/basic_info';
import { getNewLocation } from '$src/lib/utils/new_location';
import type { user } from '$src/types/user';
import type { BasicInfo } from '$src/lib/custom_types';

let basicInfo: BasicInfo = {
	token: '',
	business: undefined,
	user: newUser(),
	users: [],
	valid: false,
	clientAddresses: [],
	businessAddress: getNewLocation(),
	defaultPickupLocation: getNewLocation(),
	defaultDeliveryLocation: getNewLocation(),
	bookings: [],
	quotes: [],
	shipments: []
};
interface BasicStore {
	basicStore: Writable<BasicInfo>;
	updateBasicStore: (data: BasicInfo) => void;
	getBasicStore: () => BasicInfo;
	resetBasicStore: () => void;
}
function initBasicProvider(): BasicStore {
	let basicStore: Writable<BasicInfo> = writable(basicInfo);
	if (browser) {
		const old_basic_data = localStorage.getItem('basicStore');
		if (old_basic_data) {
			basicStore = writable(JSON.parse(old_basic_data));
		}
		basicStore.subscribe((value) => {
			return value;
		});
		basicStore.subscribe((value) => {
			if (value) {
				localStorage.setItem('basicStore', JSON.stringify(value));
			}
		});
		const getBasicStore = (): BasicInfo => {
			return get(basicStore);
		};
		const updateBasicStore = (value: BasicInfo) => {
			basicStore.update(() => value);
		};
		const resetBasicStore = () => {
			basicStore.update(() => {
				return basicInfo;
			});
		};
		return { basicStore, updateBasicStore, resetBasicStore, getBasicStore };
	} else {
		const getBasicStore = (): BasicInfo => {
			return basicInfo;
		};
		const updateBasicStore = (value: BasicInfo) => {
			basicInfo = value;
		};
		const resetBasicStore = () => {
			basicInfo = {
				token: '',
				business: undefined,
				user: newUser(),
				users: [],
				valid: false,
				clientAddresses: [],
				businessAddress: getNewLocation(),
				defaultPickupLocation: getNewLocation(),
				defaultDeliveryLocation: getNewLocation(),
				bookings: [],
				quotes: [],
				shipments: []
			};
		};
		return { basicStore, updateBasicStore, resetBasicStore, getBasicStore };
	}
}
export const { basicStore, updateBasicStore, resetBasicStore, getBasicStore } = initBasicProvider();

function newUser(): user {
	const user: user = {
		name: '',
		userName: '',
		password: '',
		confirmPassword: '',
		origin: '',
		emailVisibility: false,
		type: '',
		id: '',
		created: '',
		updated: '',
		verified: false,
		avatar: '',
		lastResetSentAt: '',
		lastVerificationSentAt: '',
		passwordHash: '',
		tokenKey: '',
		token: '',
		email: '',
		phoneNumber: '',
		organizationId: '',
		emailConfirmed: false
	};
	return user;
}
