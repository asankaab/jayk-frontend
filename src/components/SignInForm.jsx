'use client'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useActionState, useEffect } from "react";
import { permanentRedirect, redirect, useRouter } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Terminal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "@/actions/auth";
import { ZodAlert } from "./ZodAlert";
 
export default function SignInForm() {

  const [state, formAction, isPending] = useActionState(signIn, undefined, );

  const router = useRouter();
  // Force refresh the page
  useEffect(() => {
    if (state?.user?.id) {
        router.refresh();
        setTimeout(() => {
        redirect("/myaccount", "replace");
      }, 1000);
    }
  },[state?.user?.id])

  if (state?.user) {
    return <div className="p-4 text-center flex justify-center items-center space-x-2">
      <Image src="/tube-spinner.svg" alt="loading" width={40} height={15}/>
      <p>Redirecting...</p></div>
  } else {
  
  return (
    <div className="border p-4 rounded-md text-center space-y-2">
        <div>
          <h1 className=" text-2xl font-bold">Login to your account</h1>
          <p className="text-neutral-600 text-sm">Enter your email/username and password</p>
        </div>        
        <form action={formAction} className="space-y-3"
        >            
          <Input name="identifier" defaultValue={state?.fields?.identifier || ""} type="text" placeholder="@email/username" />
          <ZodAlert isPending={isPending} field={state?.formErrors?.identifier} />
          <Input name="password" type="password" placeholder="*password" />
          <ZodAlert isPending={isPending} field={state?.formErrors?.password} />
          <Button disabled={isPending} className="bg-primary hover:bg-primary-dark w-full disabled:opacity-75" type="submit">{isPending ? <Image src="bouncing-animation.svg" alt="loading" width={40} height={15}/> : "Login" }</Button>
        </form>
        <div>
          {state?.error && !isPending ? 
            <Alert>
              <Terminal className="h-4 w-4" />
              <AlertTitle className="text-left text-secondary">Error!</AlertTitle>
              <AlertDescription className="text-neutral-600 text-xs text-left">
                {state.error?.message}
              </AlertDescription>
            </Alert>
          : null}
          <div className="space-x-2">
            <Link href="/sign-up" className="text-xs text-neutral-500 hover:text-neutral-700 hover:underline">New here? Create account</Link>
            <Link href="/auth/forgotpassword" className="text-xs text-neutral-500 hover:text-neutral-700 hover:underline">Forgot password?</Link>
          </div>
       </div>
       <div className="text-xs px-4 text-neutral-600">
       By clicking continue, you agree to our Terms of Service and Privacy Policy.
       </div>
    </div>
  )
}
}