
import type { BasicInfo } from '$src/lib/custom_types';
import { backendUrl } from '../config';

export async function getBasicInfo(fetch:any): Promise<BasicInfo> {
  let data:BasicInfo = {
    token: '',
    business: undefined,
    user: undefined,
    users: [],
    valid: false,
    clientAddresses: [],
    businessAddress: undefined,
    defaultPickupLocation: undefined,
    defaultDeliveryLocation: undefined,
    bookings: [],
    quotes: [],
    shipments: []
  };
  const url = backendUrl + '/business/get_basic_info';
  try {
    const res = await fetch(url, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    data = await res.json();
    if(data.users != undefined){
      let user = data?.business?.adminUser;
      if(user != undefined){
        data.users = [user];
      }
    }
  } catch (error) {
    console.log('Error in getBasicInfo', error);
  }
  return data;
}
