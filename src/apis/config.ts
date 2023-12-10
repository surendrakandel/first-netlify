
import { getFrontEndUrl, getEnv, getBackEndUrl } from '$src/lib/config';
export const backendUrl = getBackEndUrl();
export const frontEndUrl = getFrontEndUrl();
export const env = getEnv();

