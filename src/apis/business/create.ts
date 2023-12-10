import {  backendUrl } from '../config';

export async function updateBusiness(data: any): Promise<any> {
  try {
    const res = await fetch(`${backendUrl}/business`, {
      body: JSON.stringify(data),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PATCH'
    });
    return await res.json();
  } catch (error) {
    throw error;
  }
}
