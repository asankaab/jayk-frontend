import { ArrowRightCircle } from "lucide-react";
import Link from "next/link";

export default function LinkCard({href, title}) {
    return (
        <Link href={href} className="bg-white border rounded-md shadow-2xl shadow-black/10 p-4 font-bold flex justify-between items-center flex-nowrap text-left gap-1 w-full md:w-auto transition hover:scale-105 hover:bg-primary hover:text-white">
            <h4 className="overflow-hidden text-nowrap w-10/12 hover:text-wrap">{title}</h4>
            <ArrowRightCircle className="flex-shrink-0"/>
        </Link>
    )
}