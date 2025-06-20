'use client'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useActionState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CircleCheck } from "lucide-react";
import Image from "next/image";
import bouncingAnimation from "/public/bouncing-animation.svg"
import Link from "next/link";
import { resetPassword } from "@/actions/auth";
 
export default function ForgotPassword() {

  const [state, formAction, isPending] = useActionState( resetPassword, undefined );
  console.log(state)

  return (
    <div className="container w-11/12 mx-auto text-left py-5">
        <div className="md:w-4/12 mx-auto min-h-[85vh] grid content-center">
            <div className="border p-4 rounded-md text-center space-y-2">
                <div>
                    <h1 className=" text-2xl font-bold">Reset Password</h1>
                    <p className="text-neutral-600 text-sm">Enter your registered email address</p>
                </div>        
                <form action={formAction} className="space-y-3"
                >            
                    <Input name="email" type="text" placeholder="@email" />
                    <Button disabled={isPending} className="bg-primary hover:bg-primary-dark w-full disabled:opacity-75" type="submit">{isPending ? <Image src={bouncingAnimation} alt="loading" width={40} height={15}/> : "Send" }</Button>
                </form>
                <div>
                {state?.error && !isPending ? 
                <Alert className="text-left">
                    <AlertTitle className="flex items-center gap-2"><AlertCircle color="red"/>Validation Error</AlertTitle>
                    <AlertDescription>{state?.error?.message}</AlertDescription>
                </Alert> : null }
                {state?.ok && !isPending ? 
                <Alert className="text-left">
                    <AlertTitle className="flex items-center gap-2"><CircleCheck color="green"/>Email sent.</AlertTitle>
                    <AlertDescription>A password reset email will be sent if your email address matches our database.</AlertDescription>
                </Alert> : null }
                <div>
                    <Link href="/sign-in" className="text-xs text-neutral-500 hover:text-neutral-700 hover:underline">Sign in to my account</Link></div>
                </div>
                <div className="text-xs px-4 text-neutral-600">
                By clicking continue, you agree to our Terms of Service and Privacy Policy.
                </div>
            </div>
        </div>
    </div>
  )
}