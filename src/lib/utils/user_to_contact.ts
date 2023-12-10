import type { contact } from '$src/types/contact';
import type { user } from '$src/types/user';
import { getNewContact } from './getNewContact';

export function UserToContact(user: user): contact {
  try {
    // let contact:contact = {
    //     firstName: user?.name,
    //     phoneNumber: user?.phone_numbers[0],
    //     phoneNumberExtension: "",
    //     emailAddress: user?.email,
    //     roles: user?.role,
    //     prefferedContactMethod: "",
    //     businessId: user.business_id,
    //     type: "contact"
    // }
    return getNewContact();
  } catch (error) {
    console.debug('could not create User to Contact', error);
  }
}
