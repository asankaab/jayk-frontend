import { blockStyle } from "@/components/blockStyle"
import { getEntries } from "@/actions/strapiApi"
import { BlocksRenderer } from "@strapi/blocks-react-renderer"

export default async function GuidePage({params}) {

    const { slug } = await params;
    const guideData = await getEntries(`guides?filters[slug][$eq]=${slug}`)

    return (
        <div className="container w-11/12 mx-auto min-h-dvh text-left py-5">
            <div className="md:w-9/12">
                <BlocksRenderer content={guideData[0].content} blocks={blockStyle} />
            </div>
        </div>
    )
}