import type { quoteResponse } from '$src/types/quote';
export async function getQuotes(): Promise<quoteResponse> {
  let res;
  try {
    res = await fetch('/quote', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const data:quoteResponse = await res.json();
    return data;
  } catch (error: any) {
    throw error;
  }
}
