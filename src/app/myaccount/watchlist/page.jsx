import { auth } from "@/auth";
import { permanentRedirect, redirect } from "next/navigation";
import { getAuthedEntries, getEntries, getWatchList } from "@/actions/strapiApi";
import Card from "@/components/Card";

export default async function WatchList() {

    const session = await auth()

    if (!session) return redirect('sign-in', 'replace')

    const watchList = await getWatchList();

    return (
        <div className="space-y-2">
            <h1 className="text-2xl">Watchlist</h1>
            <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {watchList.length !== 0 ? watchList[0]?.products.map((item) => {
                return (
                  <Card key={item.documentId} href={"/realestate/" + item.slug} image={item.images[0]} beds={item.beds} bathrooms={item.bathrooms} price={item.price} title={item.title} />
                )
              }) : <p>No items in the watchlist</p>}
            </div>
        </div>
    )
}