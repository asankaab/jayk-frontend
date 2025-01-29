"use client"

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, } from "@/components/ui/command"
import { useEffect, useState } from "react"
import { getEntries } from "@/actions/strapiApi"
import Link from "next/link"
import Image from "next/image"

export function SearchBox() {

  const [query, setQuery] = useState(null);
  const [data, setData] = useState(null)
  const [show, setShow] = useState(false)

    useEffect(() => {
        if (query === "") {
            setShow(false)
        } else {
            setShow(true)
        }
        async function getData() {
            const data = await getEntries(`products?populate[images][populate]&filters[title][$containsi]=${query}&pagination[pageSize]=3`);

            setData(data)
        }
        getData();
    },[query])

  return (
        <Command>
          <CommandInput onKeyUp={(e) => setQuery(e.target.value)} onFocus={()=> setShow(true)} placeholder="Search Houses..." />
          <CommandList className={show ? "block" : "hidden"}>
            {data?.length === 0 && !query == "" ? <CommandEmpty>No Houses found.</CommandEmpty> : null}
            <CommandGroup>
              {data?.map((item, key) => (
                <CommandItem key={key} value={item.title} asChild>
                    <Link href={`/realestate/${item.slug}`} className="flex items-center gap-2 w-full px-2 py-3 cursor-pointer">
                            <Image src={item.images[0]?.formats?.small.url} alt={item.title} width={60} height={50} />{item.title}
                    </Link>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
  )
}
