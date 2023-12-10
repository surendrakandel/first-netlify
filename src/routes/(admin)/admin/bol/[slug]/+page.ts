// import { createCanvas } from 'canvas';
// import JsBarcode from "jsbarcode";
import { redirect, type LoadEvent } from '@sveltejs/kit';
import type { bookingResponse } from '$src/types/book';
import { backendUrl } from '$src/apis/config';
import { browser } from '$app/environment';
export const prerender = false;
export const ssr = true;
export async function load(args: LoadEvent) {
    if(browser){
        console.log('args are :', args)
        debugger
        try {
        const bookingId = args?.params?.slug;
        if (bookingId != "" || bookingId != null) {
            const url = backendUrl+ `/bol/${bookingId}`;
            // @ts-expect-error
            const res: Response<bookingResponse> = await args.fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
            });
            console.log('response is :', res);
            if (!res.ok) {
                return { status: res.status, body: 'Could not load PDF.' };
            }      
            // Get the PDF as an ArrayBuffer and convert it to a base64 string
            const pdfArrayBuffer = await res.arrayBuffer();
            const pdfBase64 = btoa(
                new Uint8Array(pdfArrayBuffer)
                  .reduce((data, byte) => data + String.fromCharCode(byte), '')
            );
            return {pdfBase64}
        };
        } catch (error) {
        throw redirect(302, '/');
        }
    }
}
