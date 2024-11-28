import { setToken } from "@/app/api/signin";
import { getStrapiURL } from "@/lib/utils";
import { loginSchema } from "@/lib/zod";
import { cookies } from "next/headers";

export async function signIn(pervState, formData) {
    
    const identifier = await formData.get('identifier')
    const password = await formData.get('password');

    const parsedCredentials = await loginSchema.safeParseAsync({ identifier, password })
 
    const res = await fetch(getStrapiURL('/api/auth/local'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({identifier, password}),
            });
        
        const { user, error, jwt } = await res.json();

        if (error) {
        console.log(error)
        }
        
        console.log(user, error, jwt)
            
}