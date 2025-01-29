'use client'
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "./ui/button";

export function Estimator() {

    const [price, setPrice] = useState(0);
    const [bedrooms, setBedrooms] = useState(0);
    const [bathrooms, setBathrooms] = useState(0);

    function calculatePrice(e) {
        setPrice((bedrooms * 20000 + bathrooms * 50000) + 90000);
    }

    return (
        <div className="relative grid grid-cols-4">
            <Input onChange={(e)=> setBathrooms(e.target.value)} type="number" placeholder="Bathrooms" className="py-6 rounded-sm col-span-2" />
            <Input onChange={(e)=> setBedrooms(e.target.value)} type="number" placeholder="Bedrooms" className="py-6 rounded-sm col-span-2" />
            <div className="text-2xl text-right col-span-4 flex items-center justify-between">
                <Button className="bg-primary hover:bg-primary-dark" onClick={calculatePrice}>Calculate</Button>
                <h2 className=" p-4">USD {price}</h2>
            </div>
        </div>
    )
}