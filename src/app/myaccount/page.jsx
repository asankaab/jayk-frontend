import { auth } from "@/auth";
import { SignOutBtn } from "@/components/SignOutBtn";
import { permanentRedirect, redirect } from "next/navigation"
import getProfile from "@/actions/getProfile";

export default async function MyAccount() {

    const session = await auth();
    const profile = await getProfile();
        
    function capitalize() {
        if (profile?.username) {
            return profile?.username.charAt(0).toUpperCase() + profile?.username.slice(1)
        }
        return "[undefined]"
    }

    if (!session) return redirect('sign-in', 'replace')

    return (
        <div className="space-y-2">
            <h1 className="text-2xl font-bold">Wellcome! {capitalize(profile.username)}</h1>
            <SignOutBtn />
        </div>
    )
}
