import type { BookRequest, bookingResponse } from '$src/types/book';
import {  backendUrl } from '../config';

export async function createBooking(fetch:any,inputData: BookRequest): Promise<bookingResponse> {
  try {
    const res = await fetch(`${backendUrl}/booking`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputData)
    });
    const data:bookingResponse = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
}
