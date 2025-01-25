import { menuItems } from "@/actions/menuitems";
import Link from "next/link"

export default function Footer() {
    
  const links = menuItems;

    return (
    <footer className="w-full text-center bg-blue-200/10 rounded-t-4xl md:rounded-t-5xl border md:pb-32 py-20 min-h-60 border-b-secondary border-b-4">
        <div className="container w-11/12 mx-auto text-left md:flex flex-wrap">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:w-9/12">
            {links?.map((group) => {
                if (group.subMenu) {
                return (
                    <div key={group.title}>
                    <h2 className="font-bold text-primary uppercase tracking-widest">{group.title}</h2>
                    <ul className="grid divide-y">
                        {group.subMenu.map((link) => {
                        return (
                            <Link className="text-gray-500 text-sm hover:text-primary transition hover:translate-x-1 py-4" key={link.title} href={link.url}>{link.title}</Link>
                            )
                        })}
                    </ul>
                    </div>
                )
                }
            })}
            </div>
            <div className="text-left md:w-3/12 md:pl-2">
                <p className="text-xs text-gray-400 font-light pb-4">Accumsan tempus pellentesque nulla eget tincidunt tellus. Hendrerit nibh phasellus tristique in. Iaculis congue diam at posuere viverra habitasse fringilla. Tortor neque non sed leo bibendum.

                Accumsan tempus pellentesque nulla eget tincidunt tellus. Hendrerit nibh phasellus tristique in. Iaculis congue diam at posuere viverra habitasse fringilla. Tortor neque non sed leo bibendum.
                </p>
                <h2 className="pt-4">© 1994 - 2024</h2>
            </div>
        </div>
    </footer>
    )
}