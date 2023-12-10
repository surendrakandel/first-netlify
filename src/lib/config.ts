// @ts-nocheck
import {
	PUBLIC_DEV_LOGIN_URL,
	PUBLIC_PROD_LOGIN_URL,
	PUBLIC_ENV,
	PUBLIC_BACKEND_PROD_URL,
	PUBLIC_BACKEND_DEV_URL,
	PUBLIC_FRONTEND_PROD_URL,
	PUBLIC_FRONTEND_DEV_URL,
	PUBLIC_DEV_SUPABASE_URL,
	PUBLIC_DEV_SUPABASE_ANON_KEY,
	PUBLIC_PROD_SUPABASE_URL,
	PUBLIC_PROD_SUPABASE_ANON_KEY,
	PUBLIC_ALGOLIA_APP_ID,
	PUBLIC_ALGOLIA_API_KEY
} from '$env/static/public';

export function getBackEndUrl(): string {
	if (PUBLIC_ENV == 'PROD') {
		return PUBLIC_BACKEND_PROD_URL;
	} else {
		return PUBLIC_BACKEND_DEV_URL;
	}
}
export enum Env {
	dev,
	prod
}
export function isEnvDev(): boolean {
	return getEnv() == Env.dev;
}

export function getEnv(): Env {
	if (PUBLIC_ENV == 'PROD') {
		return Env.prod;
	} else {
		return Env.dev;
	}
}
export interface AwsCognitoIds {
	userPoolId: string;
	clientId: string;
}

export function getCognitoIds(): AwsCognitoIds {
	if (getEnv() == Env.dev) {
		return {
			userPoolId: 'us-west-1_Qz9EmmHjE',
			clientId: '71n3c0rej591nqogov1e2ajjp1'
		};
	} else {
		return {
			userPoolId: 'us-west-1_uarQrOCVG',
			clientId: '50lvtk0iodmujjkohd82u215em'
		};
	}
}

export function getFrontEndUrl(): string {
	if (PUBLIC_ENV == 'PROD') {
		return PUBLIC_FRONTEND_PROD_URL;
	} else {
		return PUBLIC_FRONTEND_DEV_URL;
	}
}
export function getLoginUrl(): string {
	if (PUBLIC_ENV == 'PROD') {
		return PUBLIC_PROD_LOGIN_URL;
	} else {
		return PUBLIC_DEV_LOGIN_URL;
	}
}
export interface SupaBaseConfig {
	url: string;
	anonKey: string;
}
export function getSupaBaseConfig(): SupaBaseConfig {
	if (getEnv() == Env.prod) {
		return {
			url: PUBLIC_PROD_SUPABASE_URL,
			anonKey: PUBLIC_PROD_SUPABASE_ANON_KEY
		};
	}
	return {
		url: PUBLIC_DEV_SUPABASE_URL,
		anonKey: PUBLIC_DEV_SUPABASE_ANON_KEY
	};
}
export const algoliaConfig = {
	appId: PUBLIC_ALGOLIA_APP_ID,
	apiKey: PUBLIC_ALGOLIA_API_KEY
};
