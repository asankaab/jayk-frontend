import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/myaccount') && !request.cookies.get('token')) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }
}