'use client' // Error boundaries must be Client Components
 
import { Button } from '@/components/ui/button'
import { useEffect } from 'react'
 
export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error.message)
  }, [error])
 
  return (
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
  )
}