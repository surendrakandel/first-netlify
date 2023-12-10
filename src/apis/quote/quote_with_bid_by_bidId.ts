
import type { quoteResponse } from '$src/types/quote';
import { backendUrl } from '../config';
export async function getQuoteWithBidByBidId(bidId: string): Promise<quoteResponse> {
  try {
    const res = await fetch(`${backendUrl}/quote/quotewithbid/${bidId}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const data:quoteResponse = await res.json();
    return data;
  } catch (error: any) {
    console.debug('error occured', JSON.stringify(error.request), error.message);
    throw error;
  }
}
