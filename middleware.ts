import { NextResponse, NextRequest } from 'next/server'
import { cookies } from 'next/headers'

export async function middleware(request: NextRequest) {
  const cookieStore = cookies()
  const idToken = cookieStore.get('idToken')?.value
  const accessToken = cookieStore.get('accessToken')?.value
  const hasToken = !!idToken && !!accessToken

  const currentPath = request.nextUrl.pathname

  if (currentPath === '/') {
    const url = hasToken ? '/rooms' : '/login'
    return NextResponse.redirect(new URL(url, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|images|favicon.ico).*)',
}
