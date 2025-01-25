'use client'
import { useState } from "react";
import { Button } from "./ui/button"
import { Bookmark, BookmarkCheck, Heart, LoaderIcon } from "lucide-react";
import { save } from "@/actions/strapiApi";
import Image from "next/image";

export default function FavouriteButton({disabled, isFav, productId}) {

    const [ state, setState ] = useState(isFav);
    const [ loading, setLoading ] = useState(false);
    
    return (
        <Button onClick={
            async() => {
                setLoading(true);
                await save(productId);
                setState(!state)
                setLoading(false);
        }} 
        disabled={disabled} type="submit" 
        className="text-neutral-800 hover:text-white bg-neutral-100 border 
        hover:bg-primary disabled:text-neutral-400 space-x-2">
            <div className=" flex items-center gap-1 ">
                { loading ? <Image src="/tube-spinner.svg" alt="loading" width={16} height={16}/> : 
                <Heart fill={state ? "rgb(35 52 109)" : "none"} size={state ? 18 : 15}/> }
            </div> <p>{ state ? "Saved" : "Save to Watchlist"}</p>
        </Button>
    )
}