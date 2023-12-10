import { newQuoteResponse } from '$src/lib/custom_types.js';
import type { quoteResponse } from '$src/types/quote.js';
import {  backendUrl } from '../config.js';

export async function getBidWithQuoteBybidId(bidId: string): Promise<quoteResponse> {
  if (!bidId || bidId.length < 4) {
    throw new Error('Bid id is not valid');
  }
  const data = newQuoteResponse();
  try {
    const res = await fetch(`${backendUrl}/quote/quotewithbid/${bidId}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return await res.json();
  } catch (error) {
    console.log('eror occured', error);
  }
  return data;
}
