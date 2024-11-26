import { auth } from './auth';

export default auth((req) => {
  if (req.auth && req.nextUrl.pathname == "/sign-in") {
    const newUrl = new URL("/myaccount", req.nextUrl.origin)
    return Response.redirect(newUrl)
  }
  if (req.auth && req.nextUrl.pathname == "/sign-up") {
    const newUrl = new URL("/myaccount", req.nextUrl.origin)
    return Response.redirect(newUrl)
  }
  if (!req.auth && req.nextUrl.pathname == "/myaccount") {
    const newUrl = new URL("/sign-in", req.nextUrl.origin)
    return Response.redirect(newUrl)
  }
})
 
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.svg$).*)'],
};