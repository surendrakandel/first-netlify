import type { address } from '$src/types/address';
import {  backendUrl } from '../config';
export async function updatePickupAddress(inputData: address): Promise<any> {
  try {
    const res = await fetch(`${backendUrl}/business/update_pickup_address`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputData)
    });
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
}
