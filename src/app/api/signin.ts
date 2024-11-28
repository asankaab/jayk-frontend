import { cookies } from "next/headers"

export async function setToken(jwt) {
    const cookieStore = await cookies()
    cookieStore.set('token', jwt)
}