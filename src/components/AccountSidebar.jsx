'use client'

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetOverlay, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { PanelRight, X } from "lucide-react";
import Image from "next/image";
import logo from "/public/logo.svg"
import Link from "next/link";
import { useState } from "react";

export function AccountSidebar({links}) {

    const [ open, setOpen ] = useState(false);

    function sheetTrigger() {
        if (open) {
            setOpen(false)
        } else {
            setOpen(true)
        }
    }
    
    return (
        <>
            <Sheet className="md:hidden" open={open}>
                <SheetOverlay onClick={sheetTrigger}/>
                <SheetContent side="left">
                    <SheetHeader>
                        <SheetTitle><Image src={logo} alt="logo" width={100} height={5} className="w-auto"/></SheetTitle>
                        <SheetDescription className="text-left">Your Account</SheetDescription>
                        <button onClick={sheetTrigger}
                            className="absolute right-4 top-4 border-2 p-0.5 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-neutral-100 dark:ring-offset-neutral-950 dark:focus:ring-neutral-300 dark:data-[state=open]:bg-neutral-800">
                            <X className="h-4 w-4" />
                            <span className="sr-only">Close</span>
                        </button>
                    </SheetHeader>
                    <div className="divide-y-2">
                        {links?.map((link, index) => {
                            return (
                                <Link onClick={sheetTrigger} key={index} className="py-2 text-neutral-700 hover:text-neutral-900 block" href={link.href}>{link.title}</Link>
                            )
                        })}
                    </div>
                </SheetContent>
            </Sheet>
            
            <button onClick={sheetTrigger} className="md:hidden"><PanelRight/></button>

            <div className="hidden md:block px-4 py-4 space-y-6 min-h-full col-span-12 md:col-span-3 bg-slate-50 rounded-md ">
                <Image src={logo} alt="logo" width={100} height={5} className="w-auto"/>
                <div className="divide-y-2">
                    {links?.map((link, index) => {
                            return (
                                <Link key={index} className="py-2 text-neutral-700 hover:text-neutral-900 block" href={link.href}>{link.title}</Link>
                            )
                        })}
                </div>
            </div>
        </>
    )
}