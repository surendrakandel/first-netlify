import type { bookingResponse } from '$src/types/book';
import { backendUrl } from '../config';
export async function getBookingByBookingId(bookingId: string): Promise<bookingResponse> {
  let res;
  try {
    res = await fetch(`${backendUrl}/booking/${bookingId}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    const data:bookingResponse = await res.json();
    return data;
  } catch (error: any) {
    throw error;
  }
}
