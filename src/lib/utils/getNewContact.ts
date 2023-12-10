import type { contact } from '$src/types/contact';
import { isEnvDev } from '../config';

export function getNewContact(): contact {
  if(isEnvDev()){
    return {
      name: 'surendra kandel',
      phoneNumber: '7135162836',
      emailAddress: 'kandelsuren@gmail.com',
      phoneNumberDisplay: '',
      roles: [],
      prefferedContactMethod: '',
      businessId: '',
      type: ''
    }
  }
  const contact: contact = {
    name: '',
    phoneNumber: '',
    emailAddress: '',
    phoneNumberDisplay: '',
    roles: [],
    prefferedContactMethod: '',
    businessId: '',
    type: ''
  };
  return contact;
}
