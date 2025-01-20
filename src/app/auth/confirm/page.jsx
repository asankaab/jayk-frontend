import { confirmEmail } from "@/actions/auth";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getStrapiURL } from "@/lib/utils";
import { error } from "console";
import { AlertCircle, CircleCheck } from "lucide-react";
import { redirect } from "next/dist/server/api-utils";
import Image from "next/image";
import Link from "next/link";
 
export default async function Confirm({ searchParams }) {

    const params = await searchParams;
    const code = await params.code
    const username = await params.username

    const data = await confirmEmail(code, username);

    return (
        <div className="container w-11/12 mx-auto text-left py-5">
            <div className="md:w-4/12 mx-auto min-h-[85vh] grid content-center">
                <div className="border p-4 rounded-md text-center space-y-2">
                               
                    <Input name="email" type="text" placeholder="@email" defaultValue={username} disabled/>
                    <Input name="code" type="text" placeholder="code" defaultValue={code} disabled/>

            
                        { data?.success && <Alert className="text-left">
                            <AlertTitle className="flex items-center gap-2"><CircleCheck color="green"/>Success</AlertTitle>
                            <AlertDescription>You have successfully verified your email address <p className="font-bold">{params.email}</p>
                            <Link href="/sign-in" className="text-xs text-neutral-500 hover:text-neutral-700 hover:underline">Login to my account</Link></AlertDescription>
                        </Alert>} 

                        { data?.error && <Alert className="text-left">
                            <AlertTitle className="flex items-center gap-2"><AlertCircle color="red"/>Error</AlertTitle>
                            <AlertDescription>{data?.error?.message}</AlertDescription>
                        </Alert> }
                    
                </div>
            </div>
        </div>
            
    )
}
