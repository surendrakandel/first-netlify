import { backendUrl } from '../config';

export async function getBusinessCount(): Promise<string> {
  try {
    const res = await fetch(`${backendUrl}/business/business_count`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET'
    });
    const data = await res.text();
    return data;
  } catch (error) {
    throw error;
  }
}