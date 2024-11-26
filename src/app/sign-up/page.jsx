import { SignupForm } from "@/components/SignupForm";

export default async function SignUpPage() {

    return (
        <div className="container w-11/12 mx-auto py-5">
            <div className="md:w-4/12 mx-auto min-h-[85vh] grid content-center">
                <SignupForm/>
            </div>
        </div>
    )
}