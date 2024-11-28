import { signIn } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cookies } from "next/headers";

export default async function Login() {

    const cookieStore = await cookies()
    cookieStore.set('token', "testtoken")

    return (
        <form action={signIn} className="space-y-3"
        >            
          <Input name="identifier" defaultValue={state?.identifier || ""} type="text" placeholder="@email/username" />
          <Input name="password" type="password" placeholder="*password" />
          <Button disabled={isPending} className="bg-primary hover:bg-primary-dark w-full disabled:opacity-75" type="submit">{isPending ? <Image src="bouncing-animation.svg" alt="loading" width={40} height={15}/> : "Login" }</Button>
        </form>
    )
}