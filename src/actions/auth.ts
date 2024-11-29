import { getStrapiURL } from "@/lib/utils";
import { loginSchema } from "@/lib/zod";

export async function signIn(pervState, formData) {
    
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

    const user = await route.json();
    console.log(user)
}
