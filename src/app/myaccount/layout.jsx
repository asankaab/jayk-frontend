import BreadCrumbs from "@/components/BreadCrumbs";
import { AccountSidebar } from "@/components/AccountSidebar";

export const metadata = {
    title: 'Jayk - My Account',
}

export default async function Layout({children}) {

    const links =  [
        { href: "/myaccount", title: "Dashboard" },
        { href: "/myaccount/profile", title: "Profile" },
        { href: "/myaccount/watchlist", title: "Watchlist" },
    ]

    return (
        <div className="container w-11/12 mx-auto text-left py-2">
            <div className="grid md:grid-cols-12 content-start">
                <div className="col-span-12 md:col-span-3 md:min-h-[80vh]">
                    <AccountSidebar links={links}/>
                </div>
                <div className="md:px-4 col-span-12 md:col-span-9">
                    <div className="border-b pb-2"><BreadCrumbs/></div>                    
                    <div className="py-2">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}