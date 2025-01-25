import Image from "next/image"
import { Badge } from "./ui/badge"
import Link from "next/link"

export default function Card({ href, image, title, price, beds, bathrooms}) {

    const blurData = "data:image/gif;base64,R0lGODlhCgAGAPcAAAAAAAAAMwAAZgAAmQAAzAAA/wArAAArMwArZgArmQArzAAr/wBVAABVMwBVZgBVmQBVzABV/wCAAACAMwCAZgCAmQCAzACA/wCqAACqMwCqZgCqmQCqzACq/wDVAADVMwDVZgDVmQDVzADV/wD/AAD/MwD/ZgD/mQD/zAD//zMAADMAMzMAZjMAmTMAzDMA/zMrADMrMzMrZjMrmTMrzDMr/zNVADNVMzNVZjNVmTNVzDNV/zOAADOAMzOAZjOAmTOAzDOA/zOqADOqMzOqZjOqmTOqzDOq/zPVADPVMzPVZjPVmTPVzDPV/zP/ADP/MzP/ZjP/mTP/zDP//2YAAGYAM2YAZmYAmWYAzGYA/2YrAGYrM2YrZmYrmWYrzGYr/2ZVAGZVM2ZVZmZVmWZVzGZV/2aAAGaAM2aAZmaAmWaAzGaA/2aqAGaqM2aqZmaqmWaqzGaq/2bVAGbVM2bVZmbVmWbVzGbV/2b/AGb/M2b/Zmb/mWb/zGb//5kAAJkAM5kAZpkAmZkAzJkA/5krAJkrM5krZpkrmZkrzJkr/5lVAJlVM5lVZplVmZlVzJlV/5mAAJmAM5mAZpmAmZmAzJmA/5mqAJmqM5mqZpmqmZmqzJmq/5nVAJnVM5nVZpnVmZnVzJnV/5n/AJn/M5n/Zpn/mZn/zJn//8wAAMwAM8wAZswAmcwAzMwA/8wrAMwrM8wrZswrmcwrzMwr/8xVAMxVM8xVZsxVmcxVzMxV/8yAAMyAM8yAZsyAmcyAzMyA/8yqAMyqM8yqZsyqmcyqzMyq/8zVAMzVM8zVZszVmczVzMzV/8z/AMz/M8z/Zsz/mcz/zMz///8AAP8AM/8AZv8Amf8AzP8A//8rAP8rM/8rZv8rmf8rzP8r//9VAP9VM/9VZv9Vmf9VzP9V//+AAP+AM/+AZv+Amf+AzP+A//+qAP+qM/+qZv+qmf+qzP+q///VAP/VM//VZv/Vmf/VzP/V////AP//M///Zv//mf//zP///wAAAAAAAAAAAAAAACH5BAEAAPwALAAAAAAKAAYAAAg/AEHB0QQHzhs4QIpYUMYQlCaCcIwUiaaMYrQbaATC2bcvWsd9mTpCwyRM2bxk9KANy5QpDJgzNmzECBNJUqSAADs="

    const priceFormatted = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(
        price,
      )

    return (
        <div className="bg-white border rounded-md shadow-2xl shadow-black/5 text-left">
            <div className="rounded-t-md relative min-h-48">
                <Image src={image.formats.thumbnail.url || 'no-image.svg'} alt={image.alternativeText} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" placeholder="blur" blurDataURL={"data:image/gif;base64,"+image.blurhash} className="object-cover rounded-t-md" />
            </div>
            <div className="p-4 grid gap-2">
                <h2 className="font-bold text-2xl">{priceFormatted}</h2>
                <div className="flex gap-2 flex-wrap text-nowrap">
                    <Badge className="bg-secondary">{beds} | Beds</Badge>
                    <Badge className="bg-primary">{bathrooms} | Bathrooms</Badge>
                </div>
                <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm">{title}</p>
                <Link href={href} className="border rounded p-2 hover:bg-gray-100 w-full block">See Details</Link>
            </div>
        </div>
    )
}