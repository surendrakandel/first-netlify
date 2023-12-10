import type { login } from '$src/types/login';
import {  backendUrl } from './config';

export async function adminLogin(data: login): Promise<any> {
  return await fetch(backendUrl + '/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',

    }
  });
}
