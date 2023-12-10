// import { browser } from '$app/environment';
// import type { LoginResponse } from '$src/lib/custom_types';
// import { type Writable, writable } from 'svelte/store';
// interface AuthStore {
// 	updateFirstAuthStore: (data: LoginResponse | null) => void;
// 	getFirstAuthStore: () => LoginResponse | null;
// 	resetFirstAuthStore: () => LoginResponse | null;
// }

// function initAuthStore(): AuthStore {
// 	if (browser) {
// 		const firstAuthStore: Writable<LoginResponse | null> = writable<LoginResponse | null>({
// 			access_token: '',
// 			refresh_token: '',
// 			user: undefined,
// 			token_type: '',
// 			expires_in: 0,
// 			expires_at: 0
// 		});
// 		const loginData = localStorage.getItem('tokenStore');

// 		if (loginData) {
// 			try {
// 				firstAuthStore.set(JSON.parse(loginData));
// 			} catch (error) {
// 				console.log(
// 					'Error in login_store.ts: initAuthStore(): JSON.parse(loginData) failed. loginData = ',
// 					error
// 				);
// 			}
// 		}
// 		firstAuthStore.subscribe((data) => {
// 			if (data) {
// 				localStorage.setItem('tokenStore', JSON.stringify(data));
// 			}
// 		});
// 		function updateFirstAuthStore(data: LoginResponse | null) {
// 			firstAuthStore.update(() => data);
// 			if (data) {
// 				localStorage.setItem('tokenStore', JSON.stringify(data));
// 			}
// 		}
// 		function getFirstAuthStore(): LoginResponse | null {
// 			let loginRes = null;
// 			firstAuthStore.update((data) => {
// 				loginRes = data;
// 				return data;
// 			});
// 			return loginRes;
// 		}
// 		function resetFirstAuthStore(): LoginResponse | null {
// 			// returns loginResponse
// 			const loginRes = null;
// 			firstAuthStore.update((data) => {
// 				return {
// 					access_token: '',
// 					refresh_token: '',
// 					user: undefined,
// 					token_type: '',
// 					expires_in: 0,
// 					expires_at: 0
// 				};
// 			});
// 			return loginRes;
// 		}
// 		return { updateFirstAuthStore, getFirstAuthStore, resetFirstAuthStore };
// 	} else {
// 		return {
// 			updateFirstAuthStore: () => {},
// 			getFirstAuthStore: () => null,
// 			resetFirstAuthStore: () => null
// 		};
// 	}
// }
// export const { updateFirstAuthStore, getFirstAuthStore, resetFirstAuthStore } = initAuthStore();
