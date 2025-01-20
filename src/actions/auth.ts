import { getStrapiURL } from "@/lib/utils";
import { emailSchema, loginSchema } from "@/lib/zod";
import { createWatchlist } from "./strapiApi";

export async function signIn(prevState, formData) {
    
    const identifier = await formData.get('identifier')
    const password = await formData.get('password');

    const parsedCredentials = await loginSchema.safeParseAsync({ identifier, password })

    const route = await fetch('/api/auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsedCredentials.data),
        });

    const { user, error } = await route.json();
    
    return { user, error };
}

export async function signUp(prevState, formData) {
    
    const email = await formData.get('email')
    const username = await formData.get('username')
    const password = await formData.get('password')

    const parsedCredentials = await emailSchema.safeParseAsync({ email })

    const res = await fetch(getStrapiURL('/api/auth/register'), {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: parsedCredentials.data.email, username, password }),
    });

    const data = await res.json();
    
    return data;
}


export async function resendConfirmationEmail(prevState, formData) {

    const email = await formData.get('email')

    const parsedCredentials = await emailSchema.safeParseAsync({ email })

    const res = await fetch(getStrapiURL('/api/auth/send-email-confirmation'), {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsedCredentials.data),
    });

    const data = await res.json();
    
    return data;
}

export async function confirmEmail(code: string, username: string) {

    const res = await fetch(getStrapiURL(`/api/auth/email-confirmation?confirmation=${code}`), {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        },
    });

    if (res.status === 200) {
        
        const watchList = await createWatchlist(username);
        console.log(watchList)

        return { success: true };
    }

    return null
}