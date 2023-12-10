import {  backendUrl } from '../config';

export async function UpdateBusinessName(businessName: string): Promise<any> {
  try {
    const res = await fetch(`${backendUrl}/business/update_business_name`, {
      body: JSON.stringify({
        businessName
      }),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PATCH'
    });
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
}
