import { backendUrl } from '$src/apis/config.js';

export const prerender = false;
export async function load(args) {
  const data = await args.fetch(backendUrl, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data1 = await data.json();
  return data1;
}
