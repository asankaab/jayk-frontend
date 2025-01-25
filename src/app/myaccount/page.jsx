import { SignOutBtn } from "@/components/SignOutBtn";
import { permanentRedirect, redirect } from "next/navigation"
import { getUser } from "@/authentication";

export default async function MyAccount() {
    const profile = await getUser();
        
    function capitalize() {
        if (profile?.username) {
            return profile?.username.charAt(0).toUpperCase() + profile?.username.slice(1)
        }
        return "[undefined]"
    }

    if (!profile) return redirect('sign-in', 'replace')

    return (
        <div className="space-y-2">
            <h1 className="text-2xl font-bold">Wellcome! {capitalize(profile.username)}</h1>
            <SignOutBtn />
        </div>
    )
}
