import { getStrapiURL } from "@/lib/utils";
import { emailSchema, loginSchema, registerSchema } from "@/lib/zod";
import { createWatchlist } from "./strapiApi";
import { redirect } from "next/navigation";

export async function signIn(prevState, formData) {
    
    const identifier = await formData.get('identifier')
    const password = await formData.get('password');

    const parsedCredentials = await loginSchema.safeParseAsync({ identifier, password })

    if (parsedCredentials.success) {
        
        const route = await fetch('/api/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(parsedCredentials.data),
            });
    
        const { user, error } = await route.json();

        if (!user) {
            return { error, fields: { identifier: identifier } };;
        }
        
        return { user };
        
    } else {
        return { 
            formErrors: parsedCredentials?.error?.formErrors?.fieldErrors, 
            fields: {
                identifier: identifier
            }
                    
        };
    }
}

export async function signUp(prevState, formData) {
    
    const email = await formData.get('email')
    const username = await formData.get('username')
    const password = await formData.get('password')

    const parsedCredentials = await registerSchema.safeParseAsync({ email, username, password })

    if (parsedCredentials.success) {

        const res = await fetch(getStrapiURL('/api/auth/local/register'), {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(parsedCredentials.data),
        });

        const { user, error } = await res.json();
        
        return { 
            user, 
            serverErrors: error?.message,
            fields: {
                email: email, username: username
        } };

    } else {
        return { 
            formErrors: parsedCredentials?.error?.formErrors?.fieldErrors, 
            fields: {
                email: email, username: username
            }
                    
        };
    }
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

        return { success: true };
    }

    return null
}