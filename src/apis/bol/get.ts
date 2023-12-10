import type { bookingResponse } from '$src/types/book';
import { backendUrl } from '../config';
export async function getBolData(
  bidId: string,
  quoteId: string,
  businessId: string
): Promise<bookingResponse> {
  try {
    const res = await fetch(
      `${backendUrl}/bids/bid?bidId=${bidId}&businessId=${businessId}&quoteId=${quoteId}`,
      {
        method: 'GET',
        credentials: 'include',
      }
    );
    const data:bookingResponse = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
}
