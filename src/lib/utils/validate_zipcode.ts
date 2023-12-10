import type { location } from "$src/types/location";
import { get, type Writable } from "svelte/store";
import { zipCodeRegex } from "./regex";

export function validateZipCode(locationData:Writable<location>){
    let loc = get(locationData);
    let valid = zipCodeRegex.test(loc.address.zipCode);
    if(!valid){
      locationData.update((value)=>{
        value.address.zipCode = '';
        return value;
      })
    }
  }