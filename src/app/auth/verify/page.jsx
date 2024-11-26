import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getStrapiURL } from "@/lib/utils";
import { AlertCircle, CircleCheck } from "lucide-react";
import { redirect } from "next/dist/server/api-utils";
import Link from "next/link";
 
export default async function Verify({ searchParams }) {

    const params = await searchParams;
    const code = { confirmation: params.confirmation }

    const res = await fetch(getStrapiURL(`/api/auth/email-confirmation?confirmation=${params.confirmation}`));
    console.log(res)
    return (
        <div className="container w-11/12 mx-auto text-left py-5">
            <div className="md:w-4/12 mx-auto min-h-[85vh] grid content-center">
                <div className="border p-4 rounded-md text-center space-y-2">
                    { res.status === 200 ?
                        <Alert className="text-left">
                            <AlertTitle className="flex items-center gap-2"><CircleCheck color="green"/>Success</AlertTitle>
                            <AlertDescription>You have successfully verified your email address <p className="font-bold">{params.email}</p>
                            <Link href="/sign-in" className="text-xs text-neutral-500 hover:text-neutral-700 hover:underline">Login to my account</Link></AlertDescription>
                        </Alert> : 
                        <Alert className="text-left">
                            <AlertTitle className="flex items-center gap-2"><AlertCircle color="red"/>Error</AlertTitle>
                            <AlertDescription>Email verification failed. <p className="font-bold">{params.email}</p></AlertDescription>
                        </Alert> 
                    }                    
                </div>
            </div>
        </div>
            
    )
}
