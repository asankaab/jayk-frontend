'use client'
import { PhoneIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import Image from "next/image";
import { useActionState, useEffect } from "react";
import { createOrder } from "@/actions/strapiApi";
import { ZodAlert } from "./ZodAlert";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

export default function ContactButton({ productData }) {

    const [state, formAction, isPending] = useActionState(createOrder, undefined, );

    useEffect(() => {
        if (state?.data?.documentId) toast("Thank you for reaching us. You will be contacted by our agent as soon");
    }, [state?.data?.documentId]);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="text-neutral-800 hover:text-white bg-neutral-100 border 
            hover:bg-primary disabled:text-neutral-200 space-x-2 transition">
                    <PhoneIcon size={15}/> <p>Contact</p>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Request a Callback.</DialogTitle>
                <DialogDescription>
                    Leave us a message and we will get back to you as soon as possible.
                </DialogDescription>
                </DialogHeader>
                <form action={formAction} className="grid gap-4">
                    <input type="hidden" name="productId" defaultValue={productData[0]?.documentId}/>
                    <Input type="text" name="name" placeholder="Name" className="border border-neutral-200 p-2"/>
                    <ZodAlert isPending={isPending} field={state?.formErrors?.name} />
                    <Input type="email" name="email" placeholder="Email" className="border border-neutral-200 p-2"/>
                    <ZodAlert isPending={isPending} field={state?.formErrors?.email} />
                    <Input type="tel" name="phone" placeholder="Phone" className="border border-neutral-200 p-2"/>
                    <ZodAlert isPending={isPending} field={state?.formErrors?.phone} />
                    <Textarea maxLength={200} name="message" placeholder="Message" className="border border-neutral-200 p-2" defaultValue={"Product #ID: " + productData[0].id}/>
                    <Button disabled={isPending} className="bg-primary hover:bg-primary-dark w-full disabled:opacity-75" type="submit">
                        {isPending ? <Image src="/bouncing-animation.svg" alt="loading" width={40} height={15}/> : "Submit" }
                    </Button>
                </form>
                {state?.error ? <Alert variant="destructive"><AlertTitle>{state?.error?.name}</AlertTitle><AlertDescription>{state?.error?.message}</AlertDescription></Alert>: null}
            </DialogContent>
        </Dialog>
    )
}