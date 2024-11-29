import { signOut } from "@/authentication"
import { Button } from "./ui/button"
 
export function SignOutBtn() {
  return (
    <form
      action={async() => await signOut()}
    >
      <Button type="submit" className="bg-secondary hover:bg-secondary-dark">Logout</Button>
    </form>
  )
}