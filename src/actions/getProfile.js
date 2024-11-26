'use server'

import { auth } from "@/auth";
import { getStrapiURL } from "@/lib/utils";

async function getProfile() {

    const session = await auth();
        
    const res = await fetch(getStrapiURL('/api/users/me?populate=*'), {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${session?.jwt}`,
            'Content-Type': 'application/json',
        },
    });

    const data = await res.json();

    return data;
}

export default getProfile;