
import Image from "next/image";
import Link from "next/link";
import AccountBtn from "./AccountBtn";
import {  Disclosure, DisclosureButton, DisclosurePanel, Popover, PopoverButton, PopoverGroup, PopoverPanel } from "@headlessui/react";
import { Menu, SquareX } from "lucide-react";
import logo from "/public/logo.svg"
import { menuItems } from "@/actions/menuitems";

export default function Header() {

    const links = menuItems;

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
                <Disclosure as="div" className="flex data-[open]:block items-center justify-between">
                    <div className="relative inset-y-0 left-0 flex items-center md:hidden">
                        <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-black data-[hover]:bg-primary/20 hover:text-white focus:text-black focus:bg-primary/20 z-50">
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Open main menu</span>
                            <Menu aria-hidden="true" className="block group-data-[open]:hidden" />
                            <SquareX aria-hidden="true" className="hidden group-data-[open]:block" />
                        </DisclosureButton>
                    </div>
                    <DisclosurePanel transition className="divide-y justify-between bg-white w-full absolute left-0 top-0 min-h-dvh box-border pt-14 origin-top transition duration-200 ease-out data-[closed]:-translate-y-6 data-[closed]:opacity-0">
                    {links.map((item) => {
                        if (item.subMenu) {
                            return (
                            <Popover key={item.title} as="div" className="relative">
                                <PopoverButton className="font-bold  
                                hover:text-black focus:outline-0 text-left w-full"><div className="w-11/12 mx-auto py-4">{item.title}</div></PopoverButton>
                                <PopoverPanel focus transition={true} className="divide-y origin-top transition duration-200 ease-out data-[closed]:-translate-y-6 data-[closed]:opacity-0">
                                    {item.subMenu.map((subItem) => {
                                        return (
                                            <PopoverGroup key={subItem.title}>
                                                <DisclosureButton as={Link} href={subItem.url} className="block px-3 text-gray-500 text-sm hover:text-black">
                                                    <div className="w-11/12 mx-auto py-4">{subItem.title}</div>
                                                </DisclosureButton>
                                            </PopoverGroup>
                                            )
                                    })}
                                </PopoverPanel>
                            </Popover>
                            )
                        } else {
                            return (
                                <DisclosureButton as={Link} href={item.url} key={item.title} className="flex font-bold
                                    hover:text-black focus:outline-0 text-left"><div className="w-11/12 mx-auto py-4">{item.title}</div>
                                </DisclosureButton>
                            )
                    }})}
                    </DisclosurePanel>
                </Disclosure>
                <Link href='/' className="block">
                        <Image src="/logo.svg" alt="logo" width={100} height={5} className="w-auto"/>
                </Link>
                <AccountBtn/>
            </nav>
        </header>
    )
    
}