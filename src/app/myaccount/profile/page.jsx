import { auth } from "@/auth";
import { permanentRedirect, redirect } from "next/navigation";
import getProfile from "@/actions/getProfile";
import { CircleCheck } from "lucide-react";
import Link from "next/link";

export default async function Profile() {

    const session = await auth();
    const profile = await getProfile();
    
    function capitalize() {
        if (profile?.username) {
            return profile?.username.charAt(0).toUpperCase() + profile?.username.slice(1)
        }
        return "[undefined]"
    }

    const createdAtObj = new Date(profile.createdAt);
    const createdDate = createdAtObj.toDateString();
    const createdTime = createdAtObj.toLocaleTimeString();

    if (!session) return redirect('sign-in', 'replace')

    return (
        <div className="space-y-2">
            <div className=" rounded-md">
                <h4 className="bg-neutral-50 p-1 rounded-t-md text-xs">ID</h4>
                <h1 className="p-1">{profile.id}</h1>
            </div>
            <div className=" rounded-md">
                <h4 className="bg-neutral-50 p-1 rounded-t-md text-xs">Username</h4>
                <h1 className="p-1">{capitalize(profile.username)}</h1>
            </div>
            <div className=" rounded-md">
                <h4 className="bg-neutral-50 p-1 rounded-t-md text-xs">Email</h4>
                <div className="flex items-center gap-1 p-1 flex-wrap text-wrap">{profile.email}{profile.confirmed ? <CircleCheck size={15} color="green"/> : <Link href="confirm" className="bg-neutral-100 border rounded-md px-2 text-sm hover:bg-neutral-200">verify</Link>}</div>
            </div>
            <div className=" rounded-md">
                <h4 className="bg-neutral-50 p-1 rounded-t-md text-xs">Created At</h4>
                <h1 className="p-1">{createdDate} - {createdTime}</h1>
            </div>
        </div>
    )
}