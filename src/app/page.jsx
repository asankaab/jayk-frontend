import Card from "@/components/Card";
import Image from "next/image";
import Link from "next/link";
import LinkCard from "@/components/LinkCard";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getEntries } from "@/actions/strapiApi";
import herobg from "/public/herobg.jpg"
import sectionbg from "/public/sectionbg.jpg"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SearchBox } from "@/components/SearchBox"
import { Estimator } from "@/components/Estimator"

export default async function Home() {

  // const homePage = await getEntries("homepage");
  const content = await getEntries("products?populate[images][populate]&pagination[pageSize]=4");
  const guides = await getEntries("guides");
  const contact = await getEntries("contact?populate=*");
  const brands = await getEntries("brand?populate=*");

  return (
    <>
    <Image src={herobg} alt="background image" fill placeholder="blur" className="object-cover -z-50"/>
      <main className="text-center relative max-h-[90dvh]">
        <div className="container w-11/12 mx-auto flex flex-col items-center justify-center min-h-dvh">
          <div className="relative -top-10 w-full md:w-9/12 text-center grid justify-items-center">
            <h1 className="text-lg md:text-2xl text-white drop-shadow-md">We are the top tier real estate platform.</h1>
            <h1 className="text-4xl md:text-6xl text-white drop-shadow-md py-2">Unlock the door to your Future.</h1>
            
              <Tabs defaultValue="find" className="w-full md:w-8/12 rounded-md mt-2 backdrop-blur-sm bg-white/45 p-4 text-left" >
                <TabsList>
                  <TabsTrigger value="find">Find A Home</TabsTrigger>
                  <TabsTrigger value="estimate">Value Estimate</TabsTrigger>
                </TabsList>
                <TabsContent value="find" className="rounded-md mt-0 backdrop-blur-sm bg-white/45 text-left">
                  <SearchBox/>
                </TabsContent>
                <TabsContent value="estimate" className="rounded-md mt-0 backdrop-blur-sm bg-white/45 text-left">
                  <Estimator/>
                </TabsContent>
              </Tabs>
            
          </div>
        </div>
      </main>
      <section className="text-center py-10">
        <div className="container w-11/12 mx-auto text-center grid justify-items-center gap-10">
          <h1 className="text-2xl">Featured Listings</h1>
          <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {content ? content?.slice(0,4).map((item) => {
                return (
                  <Card key={item.documentId} href={"realestate/" + item.slug} image={item.images[0]} beds={item.beds} bathrooms={item.bathrooms} price={item.price} title={item.title} />
                )
              }) : <p>No content</p>}
            </div>
          <Link href="realestate" className="border border-blue-900 rounded-full py-2 px-6 text-blue-900 hover:bg-gray-100">See More</Link>
        </div>
      </section>
      <section className="text-center pb-20 w-full relative">
        <div className="w-full h-2/3 bg-blue-200/40 absolute bottom-0 -z-10"></div>
        <div className="container w-11/12 mx-auto rounded-3xl">
          
          <div className="bg-white/70 h-full w-full grid content-center justify-items-center gap-4 text-center border rounded-3xl relative py-20">
            <Image src={sectionbg} alt="background image" fill placeholder="blur" className="object-cover rounded-3xl -z-10"/> 
            <h1 className="text-3xl md:text-4xl text-primary md:w-5/6">{homePage?.secondarySectionTitle}</h1>
            <p className="md:w-5/6">{homePage?.secondarySectionText}</p>
            <Link href="/explore" className="bg-secondary rounded-full py-2 px-6 text-white hover:bg-secondary-dark">Explore</Link>
          </div>
        </div>
        <div className="container w-11/12 mx-auto text-center">
          <h1 className="text-2xl text-center py-4 text-black">Guides</h1>
          <div className=" grid justify-items-stretch grid-cols-1 md:grid-cols-4 gap-4">
              {guides?.map((item) => {
                return (
                    <LinkCard key={item.documentId} href={'guides/' + item.slug} title={item.title} />
                )
              })}
            </div>
        </div>
      </section>
      <section className="text-left pt-10">
        <h1 className="text-2xl text-center py-4">{contact?.title}</h1>
        <div className="container w-11/12 mx-auto text-center flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-left flex flex-wrap gap-3 md:w-9/12">
            <div className="flex items-center gap-6">
              <Avatar className="w-20 h-20">
                <Image src={contact?.picture?.formats?.thumbnail?.url} fill alt="avatar"sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                <AvatarFallback>JK</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-bold text-lg">{contact?.name}</h2>
                <h3>{contact?.position}</h3>
              </div>
            </div>
            <div>
              <p className="pb-2">{contact?.description}</p>
              <Link href="about" className="border border-blue-900 rounded-full py-2 px-4 text-sm text-blue-900 hover:bg-gray-100">Read More</Link>
            </div>            
          </div>
          <div className="shadow-lg border rounded-md w-full h-full md:w-3/12 text-left px-4 py-4 divide-y grid gap-3">
            <h2 className="text-sm font-bold text-primary">{contact?.cardTitle}</h2>
            <h2 className="pt-3 text-sm font-bold ">{contact?.cardSubTitle}</h2>
            <h2 className="pt-3 text-lg font-bold ">{contact?.phone}</h2>
            <Link href="/contact" className="bg-secondary rounded-full py-2 px-6 text-white hover:bg-secondary-dark">Contact</Link>
          </div>
        </div>

        <div className="container w-11/12 mx-auto py-20 grid justify-items-center content-center grid-cols-2 md:grid-cols-4 gap-8">
              {brands?.logos?.map((item) => {
                return (
                  <Image key={item.documentId} src={item.url} alt={item.alternativeText} width={120} height={60} className="w-28" />
                )
              })}        
        </div>
      </section>
    </>
  )
}
