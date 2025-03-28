"use client"
 
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useActionState } from "react"
import Image from "next/image"
import { Alert, AlertDescription, AlertTitle } from "./ui/alert"
import { AlertCircle, CircleCheck } from "lucide-react"
import Link from "next/link"
import { signUp } from "@/actions/auth"
import { ZodAlert } from "@/components/ZodAlert"

export function SignupForm() {   

  const [state, formAction, isPending] = useActionState(signUp, null);

    return (
      <div className="border p-4 rounded-md text-center space-y-2">
        <div>
          <h1 className=" text-2xl font-bold">Create an account</h1>
          <p className="text-neutral-600 text-sm">Enter username, email and password</p>
        </div> 
        <form action={formAction} className="space-y-3">
          <div className="text-left">
            <Input type="text" name="username" placeholder="username" defaultValue={state?.fields?.username}/>
            <ZodAlert field={state?.formErrors?.username} isPending={isPending}/>
          </div>
          <div className="text-left">
            <Input type="text" name="email" placeholder="@email" defaultValue={state?.fields?.email}/>
            <ZodAlert field={state?.formErrors?.email} isPending={isPending}/>
          </div>
          <div className="text-left">
            <Input type="password" name="password" placeholder="*password"/>
            <ZodAlert field={state?.formErrors?.password} isPending={isPending}/>
          </div>
          <Button disabled={isPending} className="bg-primary hover:bg-primary-dark w-full disabled:opacity-75" type="submit">{isPending ? <Image src="bouncing-animation.svg" alt="loading" width={40} height={15}/> : "Create an account" }</Button>
        </form>
        {state?.serverErrors && !isPending ? 
        <Alert className="text-left">
          <AlertTitle className="flex items-center gap-2"><AlertCircle color="red"/>Error</AlertTitle>
          <AlertDescription>{state?.serverErrors}</AlertDescription>
        </Alert> : null }
        {state?.user && !isPending ? 
        <Alert className="text-left">
          <AlertTitle className="flex items-center gap-2"><CircleCheck color="green"/>Success</AlertTitle>
          <AlertDescription>Please check your email and complete registration.<p className="font-bold">{state?.user?.email}</p></AlertDescription>
        </Alert> : null }
        <div className="space-x-2">
          <Link href="/sign-in" className="text-xs text-neutral-500 hover:text-neutral-700 hover:underline">Already user? Sign in</Link>
          <Link href="/auth/confirm/resend" className="text-xs text-neutral-500 hover:text-neutral-700 hover:underline">Resend verification email</Link>
        </div>
        <div className="text-xs px-4 text-neutral-600">
        By clicking continue, you agree to our Terms of Service and Privacy Policy.
        </div>
      </div>
    )
  }