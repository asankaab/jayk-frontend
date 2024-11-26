import Image from "next/image";

export default function loading() {

    return (
        <div className="flex justify-center items-center min-h-[70vh]">
            <div><Image src="/tube-spinner.svg" alt="loading" width={60} height={25}/></div>
        </div>
    )
}