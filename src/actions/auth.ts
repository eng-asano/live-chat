'use server'

import { Auth } from '@aws-amplify/auth'
import {
  CognitoIdentityProviderClient,
  AdminUpdateUserAttributesCommand,
} from '@aws-sdk/client-cognito-identity-provider'
import { cookies } from 'next/headers'
import { jwtVerify, createRemoteJWKSet, decodeJwt } from 'jose'
import { authConfig, cookieOption } from '@/src/utils/auth'
import { UserInfo } from '@/src/types/cognito'

Auth.configure(authConfig)

const cognitoClient = new CognitoIdentityProviderClient({ region: process.env.NEXT_AWS_REGION })

/** Cognitoによる通常サインイン */
export async function signIn(_: { error: string } | undefined, formData: FormData) {
  const teamCode = formData.get('teamcode') as string
  const userId = formData.get('userid') as string
  const passWord = formData.get('password') as string

  try {
    await Auth.signIn(userId, passWord)

    const user = await Auth.currentAuthenticatedUser()

    if (teamCode !== user.attributes['custom:team_code']) {
      throw new Error('Incorrect team code.')
    }

    await updateActiveFlag(user.username, true)

    const session = await Auth.currentSession()
    const idToken = session.getIdToken().getJwtToken()
    const accessToken = session.getAccessToken().getJwtToken()

    const cookieStore = cookies()
    cookieStore.set('idToken', idToken, cookieOption)
    cookieStore.set('accessToken', accessToken, cookieOption)
  } catch (e) {
    return { error: (e as Error).message }
  }
}

/** Cognitoによる通常サインアウト */
export async function signOut(_: FormData) {
  try {
    const user = await getUserInfo()

    if (user) {
      await updateActiveFlag(user['cognito:username'], false)
      await Auth.signOut()
    }

    const cookieStore = cookies()
    cookieStore.delete('idToken')
    cookieStore.delete('accessToken')
  } catch (e) {
    console.log(e)
  }
}

/** SignIn状態のフラグを更新 */
async function updateActiveFlag(username: string, isActive: boolean) {
  const command = new AdminUpdateUserAttributesCommand({
    UserPoolId: authConfig.userPoolId,
    Username: username,
    UserAttributes: [{ Name: 'custom:is_active', Value: isActive ? '1' : '0' }],
  })
  await cognitoClient.send(command)
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
  } catch {
    return { status: 'error' } as const
  }
}

/** JWTからユーザー情報を取得 */
export async function getUserInfo() {
  const cookieStore = cookies()
  const value = cookieStore.get('idToken')?.value
  return value ? (decodeJwt(value) as UserInfo) : undefined
}
