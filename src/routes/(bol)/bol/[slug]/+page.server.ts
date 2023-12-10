// import { createCanvas } from 'canvas';
// import JsBarcode from "jsbarcode";
import { redirect, type LoadEvent } from '@sveltejs/kit';
import type { bookingResponse } from '$src/types/book';
import { backendUrl } from '$src/apis/config';
export const prerender = false;
export const ssr = true;
export async function load(args: LoadEvent) {
  console.log("loading booking page")
    try {
      const bookingId = args?.params?.slug;
      if (bookingId != "" || bookingId != null) {
        const url = backendUrl + `/booking/${bookingId}`;
        console.log('back end Url is :', backendUrl, bookingId);
        // @ts-expect-error
        const data: Response<bookingResponse> = await args.fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        if (data.ok) {
          const rawRes: bookingResponse = await data.json();
          if (rawRes?.quoteRequest?.shipmentInfo?.pickupDate && rawRes?.quoteRequest?.shipmentInfo.pickupDate.includes('T')) {
            rawRes.quoteRequest.shipmentInfo.pickupDate = rawRes.quoteRequest.shipmentInfo.pickupDate.split('T')[0];
            return rawRes;
          } else {
            return rawRes;
          }
        } else {
          throw redirect(302, '/');
        }
      } else {
        throw redirect(302, '/');
      }
    } catch (error) {
      throw redirect(302, '/');
    }
}
