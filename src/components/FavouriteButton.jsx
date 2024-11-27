'use client'
import { useState } from "react";
import { Button } from "./ui/button"
import { Bookmark, BookmarkCheck } from "lucide-react";
import { save } from "@/actions/strapiApi";

export default function FavouriteButton({disabled, isFav, productId}) {

    const [ state, setState ] = useState(isFav);
    
    return (
        <Button onClick={async() => {
            setState(!state)
            await save(productId);
        }} disabled={disabled} type="submit" className={"text-secondary bg-transparent border border-secondary hover:bg-secondary hover:text-white disabled:border-neutral-200 disabled:text-neutral-200 disabled:hover:bg-transparent"}><div className=" flex items-center gap-1 "><Bookmark fill={state ? "rgb(215 18 67)" : "none"}/></div></Button>
    )
}