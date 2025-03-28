'use client'
import { Button } from "@/components/ui/button"

 // Error boundaries must be Client Components
 
export default function GlobalError({ error, reset }) {
  return (
    // global-error must include html and body tags
    <html>
      <body>
        <div className="container w-11/12 mx-auto text-left py-5 -mt-24">
          <div className="md:w-9/12 mx-auto min-h-dvh grid justify-items-center content-center">
              <div className='md:w-3/4 min-h-20 mx-auto border rounded-md p-4'>
                <h1 className='text-lg mb-2'>An Error Occurred</h1>
                <div className='bg-neutral-50 rounded-md px-1 py-2 mb-2'>
                  <h2>{error.message}</h2>
                </div>
                <Button onClick={() => reset()}>Try Again</Button>
              </div>
          </div>
        </div>
      </body>
    </html>
  )
}