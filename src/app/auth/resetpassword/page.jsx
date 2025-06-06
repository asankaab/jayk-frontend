'use client'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useActionState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CircleCheck } from "lucide-react";
import Image from "next/image";
import bouncingAnimation from "/public/bouncing-animation.svg"
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ZodAlert } from "@/components/ZodAlert";
import { resetPasswordConfirm } from "@/actions/auth";
 
export default function ResetPassword() {

    const params = useSearchParams();
    const email = params.get('email')
    const code = params.get('code');

  const [state, formAction, isPending] = useActionState(resetPasswordConfirm,undefined,);

  return (
    <div className="container w-11/12 mx-auto text-left py-5">
        <div className="md:w-4/12 mx-auto min-h-[85vh] grid content-center">
            <div className="border p-4 rounded-md text-center space-y-2">
                <div>
                    <h1 className=" text-2xl font-bold">Forgot Password</h1>
                    <p className="text-neutral-600 text-sm">Set your new password</p>
                </div>        
                {!state?.user && <form action={formAction} className="space-y-3"
                >            
                    <Input name="email" defaultValue={email} type="email" placeholder="@email" disabled/>
                    <input type="hidden" name="code" defaultValue={code}/>
                    <div>
                        <Input name="password" type="password" placeholder="New password" />
                        <ZodAlert field={state?.formErrors?.password} isPending={isPending}/>
                    </div>
                    <div>
                        <Input name="passwordConfirmation" type="password" placeholder="Retype new password" />
                        <ZodAlert field={state?.passwordConfirmation} isPending={isPending}/>
                    </div>
                    <Button disabled={isPending} className="bg-primary hover:bg-primary-dark w-full disabled:opacity-75" type="submit">{isPending ? <Image src={bouncingAnimation} alt="loading" width={40} height={15}/> : "Reset Password" }</Button>
                </form>}
                <div>
                {state?.error && !isPending ? 
                <Alert className="text-left">
                    <AlertTitle className="flex items-center gap-2"><AlertCircle color="red"/>{state?.error?.name}</AlertTitle>
                    <AlertDescription>{state?.error?.message}</AlertDescription>
                </Alert> : null }
                {state?.user?.email && !isPending ? 
                <Alert className="text-left">
                    <AlertTitle className="flex items-center gap-2"><CircleCheck color="green"/>Sucess</AlertTitle>
                    <AlertDescription>A new password has been set for account, {state?.user?.email}</AlertDescription>
                </Alert> : null }
                <div className="space-x-2">
                    <Link href="/auth/forgotpassword" className="text-xs text-neutral-500 hover:text-neutral-700 hover:underline">Resend reset password email</Link>
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