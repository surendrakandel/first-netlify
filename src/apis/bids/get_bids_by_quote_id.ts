
import type { quoteResponse } from '$src/types/quote';
import {  backendUrl } from '../config';
export async function getBidsByQuoteId(quoteId: string): Promise<quoteResponse> {
  try {
    const res = await fetch(`${backendUrl}/bids?quoteId=${quoteId}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const data:quoteResponse = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
}
