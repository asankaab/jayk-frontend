'use client'
import { useState } from "react";
import { Button } from "./ui/button"
import { Bookmark } from "lucide-react";

export default function FavouriteButton({disabled, isFav}) {

    const [ state, setState ] = useState(isFav);
    
    return (
        <Button size="lg" onClick={() => setState(!state)} disabled={disabled} type="submit" className={state ? "bg-secondary text-white" : "text-secondary bg-transparent border border-secondary hover:bg-secondary hover:text-white disabled:border-neutral-200 disabled:text-neutral-200 disabled:hover:bg-transparent"}><div className=" flex items-center gap-2 ">Save <Bookmark size={18}/></div></Button>
    )
}