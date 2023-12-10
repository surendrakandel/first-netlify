
import { backendUrl } from './config';
export async function CreateUser(fetch:any,email:string, businessId:string, name:string, userId:string): Promise<any> {
  try {
    const res = await fetch(backendUrl + '/user', {
      method: 'POST',
      body: JSON.stringify({
        email:email,
        businessId: businessId,
        name:name,
        userId: userId
      }),

      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (res.status !== 201 && res.status !== 409) {
      throw new Error('Signup failed');
    } else if (res.status == 409) {
      throw new Error('User already exists');
    }

    return res;
  } catch (error) {
    throw error;
  }
}
