'use server'

import { Auth } from '@aws-amplify/auth'
import { cookies } from 'next/headers'
import { jwtVerify, createRemoteJWKSet } from 'jose'
import { cookieOption } from '@/src/utils/auth'

/** Cognitoによる通常サインイン */
export async function signInWithCredentials(formData: FormData) {
  const userName = formData.get('username') as string
  const passWord = formData.get('password') as string

  try {
    await Auth.signIn(userName, passWord)

    const session = await Auth.currentSession()
    const idToken = session.getIdToken().getJwtToken()
    const accessToken = session.getAccessToken().getJwtToken()

    const cookieStore = cookies()
    cookieStore.set('idToken', idToken, cookieOption)
    cookieStore.set('accessToken', accessToken, cookieOption)

    return { redirectUrl: '/rooms' }
  } catch (e) {
    console.error(e)
    return { error: 'Authentication failed' }
  }
}

/** IDトークン（認証）の検証 */
export async function verifyIdToken() {
  const cookieStore = cookies()
  const token = cookieStore.get('idToken')?.value
  return verifyToken(token)
}

/** アクセストークン（認可）の検証 */
export async function verifyAccessToken() {
  const cookieStore = cookies()
  const token = cookieStore.get('accessToken')?.value
  return verifyToken(token)
}

/**
 * JWTトークンの検証
 * @param token 検証対象のJWTトークン
 */
async function verifyToken(token?: string) {
  const region = 'ap-northeast-1' // 使用しているCognitoのリージョン
  const userPoolId = 'ap-northeast-1_RwRVqF57N' // CognitoのUser Pool ID
  const jwksUrl = `https://cognito-idp.${region}.amazonaws.com/${userPoolId}/.well-known/jwks.json`

  try {
    if (!token) throw new Error('No token specified')

    // JWK Setの取得
    const JWKS = createRemoteJWKSet(new URL(jwksUrl))

    // JWTの検証
    const { payload } = await jwtVerify(token, JWKS, {
      issuer: `https://cognito-idp.${region}.amazonaws.com/${userPoolId}`,
    })

    // ペイロードを返す
    return { status: 'success', payload } as const
  } catch (e) {
    if (e instanceof Error) {
      console.error('Token verification failed:', e.message)
    }
    return { status: 'error' } as const
  }
}
