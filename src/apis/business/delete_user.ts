import { backendUrl } from '../config';

export async function deleteUser(data: any): Promise<any> {
  const jsonData = JSON.stringify(data);
  try {
    const res = await fetch(`${backendUrl}/auth`, {
      body: jsonData,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'DELETE'
    });

    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
}
