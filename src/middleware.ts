import { NextResponse, NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { jwtVerify, createRemoteJWKSet } from 'jose'

export const config = {
  matcher: '/((?!_next/static|_next/image|images|favicon.ico).*)',
}

export async function middleware(request: NextRequest) {
  const cookieStore = cookies()
  const idToken = cookieStore.get('idToken')?.value
  const accessToken = cookieStore.get('accessToken')?.value
  const hasToken = !!idToken && !!accessToken

  const url = request.nextUrl

  if (url.pathname === '/') {
    const url = hasToken ? '/dashboard' : '/sign-in'
    return NextResponse.redirect(new URL(url, request.url))
  }

  if (url.pathname.startsWith('/api')) {
    const source = request.headers.get('x-source')
    if (source === 'server') return NextResponse.next()
    const isToken = await verifyToken(idToken)
    if (!isToken) return unauthorized()
  }

  // SocialSignIn経由で付与された認可コード、CSRF防止コードを削除
  // if (url.searchParams.has('code') || url.searchParams.has('state')) {
  //   url.searchParams.delete('code')
  //   url.searchParams.delete('state')
  //   return NextResponse.redirect(url)
  // }

  return NextResponse.next()
}

/** JWTの検証 */
async function verifyToken(token?: string) {
  const region = process.env.AWS_REGION
  const userPoolId = process.env.COGNITO_POOL_ID
  const jwksUrl = `https://cognito-idp.${region}.amazonaws.com/${userPoolId}/.well-known/jwks.json`

  try {
    if (!token) throw new Error('No token specified')

    // JWK Setの取得
    const JWKS = createRemoteJWKSet(new URL(jwksUrl))

    // JWTの検証
    await jwtVerify(token, JWKS, {
      issuer: `https://cognito-idp.${region}.amazonaws.com/${userPoolId}`,
    })

    // ペイロードを返す
    return true
  } catch {
    return false
  }
}

/** 401エラーのレスポンス */
function unauthorized() {
  return new NextResponse('Unauthorized', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Restricted Area"',
    },
  })
}
