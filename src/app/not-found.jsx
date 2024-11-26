import Link from "next/link";

export default function NotFound() {
    return (
      <>
        <main className="container w-11/12 mx-auto text-left -mt-12">
          <div className="text-center min-h-screen grid content-center justify-items-center space-y-2">
            <p className="text-base font-semibold text-primary">404</p>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Page not found</h1>
            <p className="text-base leading-7 text-gray-600">Sorry, we couldn’t find the page you’re looking for.</p>
            <div className="flex items-center justify-center">
              <Link
                href="/"
                className="px-3 py-2 text-center bg-primary rounded text-nowrap text-white hover:bg-primary-dark"
              >
                Go back home
              </Link>
            </div>
          </div>
        </main>
      </>
    )
  }
  