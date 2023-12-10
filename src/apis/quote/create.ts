import type { quoteRequest } from '$src/types/quote';
import {backendUrl } from '../config';
export async function createQuote(quote: quoteRequest): Promise<quoteRequest> {
  let res;
  try {
    res = await fetch(backendUrl + '/quote', {
      method: 'POST',
      body: JSON.stringify(quote),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }
    });
    const data:quoteRequest = await res.json();
    return data;
  } catch (error: any) {
    throw error;
  }
}
