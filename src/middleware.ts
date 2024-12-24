import { NextResponse, NextRequest } from 'next/server'
import { cookies } from 'next/headers'

export async function middleware(request: NextRequest) {
  const isAuth = basicAuth(request)

  if (!isAuth) {
    return new NextResponse('Unauthorized', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Restricted Area"',
      },
    })
  }

  const cookieStore = cookies()
  const idToken = cookieStore.get('idToken')?.value
  const accessToken = cookieStore.get('accessToken')?.value
  const hasToken = !!idToken && !!accessToken

  const url = request.nextUrl

  if (url.pathname === '/') {
    const url = hasToken ? '/dashboard' : '/sign-in'
    return NextResponse.redirect(new URL(url, request.url))
  }

  // SocialSignIn経由で付与された認可コード、CSRF防止コードを削除
  if (url.searchParams.has('code') || url.searchParams.has('state')) {
    url.searchParams.delete('code')
    url.searchParams.delete('state')
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|images|favicon.ico).*)',
}

/** Basic認証 */
function basicAuth(request: NextRequest) {
  const userName = process.env.BASIC_AUTH_USER_NAME
  const password = process.env.BASIC_AUTH_PASSWORD

  if (!userName || !password) return true

  const authHeader = request.headers.get('authorization')

  const authStr = `Basic ${Buffer.from(`${userName}:${password}`).toString('base64')}`

  return authHeader === authStr
}
