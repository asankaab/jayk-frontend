import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CircleUser } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import Link from "next/link";
import { Button } from "./ui/button";
import getProfile from "@/actions/getProfile";
import { SignOutBtn } from "./SignOutBtn";
import { auth } from "@/auth";
import { getUser } from "@/authentication";

export default async function AccountBtn() {

    const session = await auth();
    const user = await getUser();

    return (
        <Popover>
            <PopoverTrigger>
                <Avatar>
                    <AvatarImage className="border border-primary rounded-full" src={user?.avatar?.formats.small.url} />
                    <AvatarFallback><CircleUser className={session ? "outline outline-secondary rounded-full" : ""}/></AvatarFallback>
                </Avatar>
            </PopoverTrigger>
            <PopoverContent align="end" className="py-4 px-0 divide-x bg-white border rounded-lg shadow-xl md:w-auto flex h-auto w-full">
                {!session?.user ? 
                <>
                    <div className="flex flex-col justify-between items-start px-4 space-y-2">
                        <h4 className="text-sm">Existing User?</h4>
                        <Link href="/sign-in" className="px-3 py-2 bg-primary rounded text-nowrap text-white hover:bg-primary-dark">Sign In</Link>
                    </div>
                    <div className="flex flex-col justify-between items-start px-4 space-y-2">
                        <h4 className="text-sm">New User?</h4>
                        <Link href="/sign-up" className="px-3 py-2 bg-secondary rounded text-nowrap text-white hover:bg-secondary-dark">Sign Up</Link>
                    </div>
                </> : 
                <div className="px-4 space-y-2 grid">
                    <h1>Logged in.<p className="text-xs">{session.user.email}</p></h1>
                    <div className="flex gap-2">
                        <Link href="/myaccount" className="px-3 py-2 text-center bg-primary rounded text-nowrap text-white hover:bg-primary-dark">My Account</Link>
                        <SignOutBtn/>
                    </div>
                </div>
            }
            </PopoverContent>
        </Popover>

    )
}