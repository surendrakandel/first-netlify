
import type { shipmentInfo } from '$src/types/quote';
import { get } from 'svelte/store';
import { isEnvDev } from '../config';
import { getNextPickupDate } from './next_pickup_date';
import { basicStore } from '$src/routes/(admin)/admin/basic_store';

export function newShipmentInfo(): shipmentInfo {
  if(isEnvDev()){
    let pickupDate = getNextPickupDate();
    let year = pickupDate.getFullYear();
    let month = pickupDate.getMonth() + 1;
    let strMonth = month.toString();
    let day = pickupDate.getDate();
    let strDay = day.toString();
    if(month < 10){
      strMonth = '0' + month;
    }
    if(day < 10){
      strDay = '0' + day;
    }
    let pickupDateStr = year.toString() + '-' + strMonth + '-'+ strDay;
    let business = get(basicStore)
    return {
      quoteId: '',
      requesterId: '',
      mode: '',
      liablePartyId: '',
      pickupDate: '',
      displayDate: pickupDateStr,
      deliveryDate: '',
      totalItems: 1,
      totalWeight: 800,
      validUntil: '',
      editMode: false,
      businessId: business.business?.businessId || '',
      specialInstruction: '',
      shipperPickupReadyBy: '',
      business: business.business,
      requesterEmail: '',
      shipmentValue: 1,
      shipmentType: '',
      totalLength: 48,
      totalWidth: 40,
      totalHeight: 65,
      pickupReadyTime: "16:00"
    }
  }else{
    const shipmentInfo: shipmentInfo = {
      quoteId: '',
      requesterId: '',
      mode: '',
      liablePartyId: '',
      pickupDate: '',
      displayDate: '',
      deliveryDate: '',
      totalItems: undefined,
      totalWeight: undefined,
      validUntil: '',
      editMode: false,
      businessId: '',
      specialInstruction: '',
      shipperPickupReadyBy: '',
      business: undefined,
      requesterEmail: '',
      shipmentValue: undefined,
  
      shipmentType: '',
      totalLength: undefined,
      totalWidth: undefined,
      totalHeight: undefined,
      pickupReadyTime: ''
    };
    return shipmentInfo;
  }
  
}
