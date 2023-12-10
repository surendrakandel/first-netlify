import type { address } from '$src/types/address';
import {  backendUrl } from '../config';

export async function addBusinessAddress(dataInput: address): Promise<any> {
  try {
    const res = await fetch(`${backendUrl}/business/address`, {
      body: JSON.stringify(dataInput),
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
