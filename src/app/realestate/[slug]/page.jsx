import { blockStyle } from "@/components/blockStyle"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { getEntries, isFavourite, save } from "@/actions/strapiApi"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { BlocksRenderer } from "@strapi/blocks-react-renderer"
import { Bookmark, Maximize2 } from "lucide-react";
import Image from "next/image"
import { Button } from "@/components/ui/button";
import FavouriteButton from "@/components/FavouriteButton";
import { getAuthToken } from "@/authentication";

export default async function ProductPage({params}) {

    const token = await getAuthToken();

    const { slug } = await params;
    const productData = await getEntries(`products?populate[images][populate]&filters[slug][$eq]=${slug}`);

    const productId = await productData[0].documentId;
    
    const isFav = await isFavourite(productId);

    const priceFormatted = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(
        productData[0].price,
      )

    return (
        <div className="container w-11/12 mx-auto text-left py-5">
            <div className="grid md:grid-cols-2 gap-4">
                <Carousel className="bg-neutral-100 h-fit rounded-xl overflow-hidden">
                    <CarouselContent>
                        {productData[0].images.map((image) => (
                            <CarouselItem key={image.hash}>
                                <div className="relative aspect-[1.4] top-0">
                                <Image src={image.formats.large.url} sizes="(max-width: 768px) 100vw, 50vw" 
                                alt={image.alternativeText} className="object-cover" fill/>
                                <Dialog>
                                    <DialogTrigger className="absolute top-4 right-4 bg-black/15 rounded-md p-1 z-50">
                                        <Maximize2 color="white"/>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <Image src={image.formats.large.url} sizes="(max-width: 768px) 100vw, 50vw" width={800} height={800} 
                                            alt={image.alternativeText}/>
                                    </DialogContent>
                                </Dialog>
                                </div>
                            </CarouselItem>
                            ))}
                    </CarouselContent>
                    <div className="absolute bottom-6 right-4 flex items-center gap-2">
                        <CarouselPrevious/><CarouselNext/>
                    </div>
                </Carousel>
                <div className="grid gap-2 content-start justify-items-start">
                    <h1 className="text-3xl text-primary">{productData[0].title}</h1>
                    <div className="flex items-center gap-4">
                        <h2 className="text-xl">{productData[0].sqft + " sqft " + productData[0].type}</h2>
                        {productData[0].featured ? 
                        <span className="bg-secondary text-white text-xs px-2 py-1 rounded-sm">Featured</span> : null}
                    </div>
                    <div className="divide-x">
                        <span className="p-2 pl-0 font-bold">Beds: {productData[0].beds}</span>
                        <span className="p-2 font-bold">Bathrooms: {productData[0].bathrooms}</span>
                        <span className="p-2 font-bold">Stories: {productData[0].stories}</span>                       
                    </div>
                    <h2 className="font-bold text-3xl">{priceFormatted}</h2>
                    <BlocksRenderer content={productData[0].content} blocks={blockStyle} />
                    <div className="flex gap-2">
                        <FavouriteButton disabled={token ? false : true} isFav={isFav} productId={productId}/>
                        <Button className="bg-transparent border border-primary text-primary hover:bg-primary hover:text-white transition">Contact</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}