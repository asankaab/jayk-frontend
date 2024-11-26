'use client'

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Link from "next/link";
import { usePathname } from 'next/navigation'
 
export default function BreadCrumbs() {
    
  const pathname = usePathname()
  const breadcrumbs = pathname.slice(1).split('/')

  return (
    <>
        <Breadcrumb>
        <BreadcrumbList>
            <BreadcrumbItem>
                <BreadcrumbLink asChild><Link href={`/${breadcrumbs[0]}`}>{breadcrumbs[0]}</Link></BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
                <BreadcrumbPage>{breadcrumbs[1]}</BreadcrumbPage>
            </BreadcrumbItem>
        </BreadcrumbList>
        </Breadcrumb>
    </>
  )
}