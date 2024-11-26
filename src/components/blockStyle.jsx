'use client'

import { ArrowDownRight } from "lucide-react"
import Link from "next/link"

export const blockStyle = {
  paragraph: ({ children }) => <p className="text-neutral-900 pb-2">{children}</p>,
  heading: ({ children, level }) => {
    switch (level) {
      case 1:
        return <h1 className="text-5xl pb-2">{children}</h1>
      case 2:
        return <h2 className="text-4xl pb-2">{children}</h2>
      case 3:
        return <h3 className="text-3xl pb-2">{children}</h3>
      case 4:
        return <h4 className="text-2xl pb-2">{children}</h4>
      case 5:
        return <h5 className="text-xl pb-2">{children}</h5>
      case 6:
        return <h6 className="text-lg pb-2">{children}</h6>
      default:
        return <h1 className="pb-2">{children}</h1>
    }
  },
  link: ({ children, url }) => <Link to={url}>{children}</Link>,
  list: ({children}) => <ul className="list-none text-neutral-800 pb-2">{children}</ul>,
  "list-item": ({children}) => <li className="pb-1 italic text-neutral-600"><ArrowDownRight className="inline-block mr-2 text-secondary" size={18}/>{children}</li>,
}