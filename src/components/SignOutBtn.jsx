import { signOut } from "@/auth"
import { Button } from "./ui/button"
 
export function SignOutBtn() {
  return (
    <form
      action={async () => {
        "use server"
        await signOut({redirectTo: "/sign-in"})
      }}
    >
      <Button type="submit" className="bg-secondary hover:bg-secondary-dark">Logout</Button>
    </form>
  )
}