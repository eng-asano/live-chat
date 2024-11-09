import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

// Node.jsランタイムで実行するように設定
export const runtime = 'nodejs'

export async function GET(request: Request) {
  const idToken = request.headers.get('Authorization')?.split(' ')[1]

  if (!idToken) {
    return NextResponse.json({ error: 'No token provided' }, { status: 401 })
  }

  try {
    const decoded = jwt.verify(
      idToken,
      'https://cognito-idp.ap-northeast-1.amazonaws.com/ap-northeast-1_RwRVqF57N/.well-known/jwks.json'
    )
    return NextResponse.json({ message: 'Token is valid', data: decoded })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
  }
}
