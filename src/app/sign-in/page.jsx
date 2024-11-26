import { auth } from "@/auth"
import SignInForm from "@/components/SignInForm"
import { redirect } from "next/navigation"
 
export default async function SignInPage() {

  const session = await auth()

  // if (session) return redirect('myaccount')

  return (
    <div className="container w-11/12 mx-auto text-left py-5">
        <div className="md:w-4/12 mx-auto min-h-[85vh] grid content-center">
          <SignInForm/>       
        </div>
    </div>
  )
}