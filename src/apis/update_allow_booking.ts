import { basicStore } from '$src/routes/(admin)/admin/basic_store';
import type { business } from '$src/types/business';
import toast from 'svelte-french-toast';
import {  backendUrl } from './config';

export async function updateAllowBooking(allow: boolean): Promise<void> {
  try {
    const res = await fetch(backendUrl + '/business/allow_booking', {
      method: 'POST',
      body: JSON.stringify(allow),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const data: business = await res.json();
    basicStore.update((value) => {
      if (value.business) {
        value.business.allowBooking = data.allowBooking;
      }
      return value;
    });
    toast.success('bussines is booking permit updated to ' + allow);
  } catch (e: any) {
    throw e;
  }
}
