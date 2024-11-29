import { cookies } from "next/headers";
import { getStrapiURL } from "./lib/utils";

export async function getAuthToken() {
    
  const cookieStore = await cookies();
  const token = await cookieStore.get('token')

  if (token) {
    return token.value;
  }
  return null
}

export async function getUser() {
  const token = await getAuthToken();
  if (token) {
    const res = await fetch(getStrapiURL('/api/users/me?populate=avatar'), {
      method: 'GET',
      headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
      },
    });
  
    const user = await res.json();
  
    return user;
  }
  return null
}