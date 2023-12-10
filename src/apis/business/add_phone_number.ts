import type { phoneNumber } from '$src/types/phone_number';
import { backendUrl } from '../config';

export async function addPhoneNumber(inputData: phoneNumber): Promise<any> {
  try {
    const res = await fetch(`${backendUrl}/business/phone`, {
      body: JSON.stringify(inputData),
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
}
