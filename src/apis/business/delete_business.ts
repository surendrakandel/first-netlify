import { backendUrl } from '../config';

export async function deleteBusines(businessId: string): Promise<any> {
  try {
    const res = await fetch(`${backendUrl}/business`, {
      body: JSON.stringify({
        business_id: businessId
      }),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'DELETE'
    });
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
}
