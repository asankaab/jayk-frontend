import Image from "next/image";
import Link from "next/link";
import AccountBtn from "./AccountBtn";
import { Menu, SquareX, X } from "lucide-react";
import logo from "/public/logo.svg"
import { menuItems } from "@/actions/menuitems";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { getMainMenu } from "@/actions/strapiApi";

export default async function Header() {

    const links = menuItems;

    // const menu = await getMainMenu();

    return (

        <header className="py-3 md:py-5 w-full left-0 transition z-40 fixed backdrop-blur-sm border-b border-b-black/5 ">

            {/* Desktop menu */}

            <nav className="container mx-auto w-11/12 items-center justify-between hidden md:flex">
                <div className="flex justify-between items-center gap-4">
                    {links.slice(0,4).map((item) => {
                    if (item.subMenu) {
                        return (
                            <div key={item.title} className="group">
                                <button className="relative flex items-center font-bold text-sm hover:bg-secondary 
                                hover:text-white rounded px-3 py-1 focus:outline-0">{item.title}
                                    <div className="group-hover:block hidden absolute left-0 top-0 pt-10">
                                        <ul anchor='bottom start' className="text-left text-gray-600 bg-white border min-w-52 px-4 py-2 rounded-lg shadow-xl">
                                            {item.subMenu.map((subItem) => {
                                                return (
                                                    <li key={subItem.title} className="border-b last:border-b-0 text-nowrap text-sm font-normal">
                                                        <Link href={subItem.url} className="block py-2 hover:text-black">{subItem.title}</Link>
                                                    </li>)
                                            })}
                                        </ul>
                                    </div>
                                </button>
                            </div>
                        )
                        } else {
                            return (
                                <Link href={item.url} className=" z-10 overflow-hidden flex items-center font-bold text-sm hover:bg-secondary hover:text-neutral-50 rounded px-3 py-1" key={item.title}>{item.title}</Link>
                            )
                    }})}
                </div>
                <Link href='/' className="flex items-center flex-shrink-0">
                    <Image src={logo} alt="logo" width={100} height={5} className="w-auto"/>
                </Link>
                <div className="flex justify-between items-center gap-4">
                    {links.slice(4,8).map((item) => {
                        if (item.subMenu) {
                            return (
                                <div key={item.title} className="group">
                                    <button className="relative flex items-center font-bold text-sm hover:bg-secondary 
                                    hover:text-white rounded px-3 py-1 focus:outline-0">{item.title}
                                        <div className="group-hover:block hidden  absolute left-0 top-0 pt-10">
                                            <ul anchor='bottom start' className="text-left text-gray-600 bg-white border min-w-52 px-4 py-2 rounded-lg shadow-xl">
                                                {item.subMenu.map((subItem) => {
                                                    return (
                                                        <li key={subItem.title} className="border-b last:border-b-0 text-nowrap text-sm font-normal">
                                                            <Link href={subItem.url} className="block py-2 hover:text-black">{subItem.title}</Link>
                                                        </li>)
                                                })}
                                            </ul>
                                        </div>
                                    </button>
                                </div>
                            )
                            } else {
                                return (
                                    <Link href={item.url} className=" z-10 overflow-hidden flex items-center font-bold text-sm hover:bg-secondary hover:text-neutral-50 rounded px-3 py-1" key={item.title}>{item.title}</Link>
                                )
                        }})}
                    <AccountBtn/>
                </div>
            </nav>

            {/* Mobile menu */}

            <nav className="md:hidden container w-11/12 mx-auto flex justify-between items-center">
                <Sheet>
                    <div className="relative inset-y-0 left-0 flex items-center md:hidden">
                        <SheetTrigger>
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Open main menu</span>
                            <Menu aria-hidden="true" className="block group-data-[open]:hidden" />
                            <SquareX aria-hidden="true" className="hidden group-data-[open]:block" />
                        </SheetTrigger>
                    </div>
                    <SheetContent side="top" className="min-h-svh">
                        <SheetClose><X/></SheetClose>
                        <SheetHeader>
                            <SheetTitle></SheetTitle>
                            <SheetDescription>
                            </SheetDescription>
                        </SheetHeader>
                            <Accordion type="single" collapsible>
                                {links.map((item) => {
                                    if (item.subMenu) {
                                        return (
                                            <AccordionItem value={item.title} key={item.title}>
                                            <AccordionTrigger className="font-bold  
                                            hover:text-black focus:outline-0 text-left "><div className="px-5">{item.title}</div></AccordionTrigger>
                                            <AccordionContent asChild className="divide-y flex flex-col px-4">
                                                {item.subMenu.map((subItem) => {
                                                    return (
                                                        <Link key={subItem.title} href={subItem.url} className="py-4 text-gray-500 hover:text-black">
                                                            {subItem.title}
                                                        </Link>
                                                        )
                                                })}
                                            </AccordionContent>
                                            </AccordionItem>
                                        )
                                    } else {
                                        return (
                                            <Link href={item.url} key={item.title} className="flex font-bold
                                                hover:text-black focus:outline-0 text-left px-5 py-4 border-b ">{item.title}
                                            </Link>
                                        )
                                    }})
                                }
                            </Accordion>
                    </SheetContent>
                </Sheet>
                <Link href='/' className="block">
                        <Image src="/logo.svg" alt="logo" width={100} height={5} className="w-auto"/>
                </Link>
                <AccountBtn/>
            </nav>
        </header>
    )
    
}