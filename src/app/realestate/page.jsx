import { Search } from "@/components/Search";
import Card from "@/components/Card";
import { getEntries } from "@/actions/strapiApi";
import { PaginationComp } from "@/components/PaginationComp";

export default async function Page({
  searchParams,
}) {
  const { page, query } = await searchParams;

  const data = await getEntries(`products?populate[images][populate]&filters[title][$containsi]=${query || ""}&pagination[page]=${page || ""}&pagination[pageSize]=12`);

  if (!data) return null;
  return (
    <div className="container w-11/12 mx-auto py-5 text-center"> 
        <div className="flex items-center"><Search/><span>{query}</span></div>
        <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 py-4">
            {data?.map((item) => {
            return (
                <Card key={item.documentId} href={"realestate/" + item.slug} image={item.images[0]} beds={item.beds} bathrooms={item.bathrooms} price={item.price} title={item.title} />
            )
            })}
        </div>
        <PaginationComp/>
    </div>
  );
}