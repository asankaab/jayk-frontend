import { getStrapiURL } from '@/lib/utils';
import { cookies } from 'next/headers'
 
export async function POST(request) {

    const data = await request.json();

    const res = await fetch(getStrapiURL('/api/auth/local'), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        });
    
    const { user, error, jwt } = await res.json();

    if (error) {
     return new Response(JSON.stringify({ error }))
    }

    const cookieStore = await cookies()
    const token = await cookieStore.set('token', jwt)
 
    return new Response(JSON.stringify({ user }), {
        status: 200,
        // headers: { 'Set-Cookie': `${token}` },
    })
}

export async function GET(request) {

    const cookieStore = await cookies()
    const token = await cookieStore.get('token')

    return new Response(JSON.stringify({ token: token.value }), {
        status: 200,
    })
}