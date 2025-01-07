'use server'

import { Auth } from '@aws-amplify/auth'
import { CognitoIdentityProviderClient, ListUsersCommand } from '@aws-sdk/client-cognito-identity-provider'
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
    const cookieStore = cookies()
    cookieStore.delete('idToken')
    cookieStore.delete('accessToken')

    Auth.signOut()
  } catch (e) {
    console.log(e)
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
  const region = authConfig.region
  const userPoolId = authConfig.userPoolId
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

/** ユーザー情報を取得 */
export async function getUserInfo() {
  const cookieStore = cookies()
  const value = cookieStore.get('idToken')?.value
  return value ? (decodeJwt(value) as UserInfo) : undefined
}

/** 全てのユーザー情報を取得 */
export async function getMembersInfo() {
  try {
    const user = await getUserInfo()

    if (!user) return []

    const command = new ListUsersCommand({
      UserPoolId: authConfig.userPoolId,
      Limit: 60,
    })

    const { Users = [] } = await cognitoClient.send(command)

    // 同じteam_codeに属するメンバーを取得
    const teamUsers = Users.filter(({ Username, Attributes }) => {
      // 自身の情報は除く
      if (Username === user['cognito:username']) return false

      return Attributes?.some(({ Name, Value }) => {
        return Name === 'custom:team_code' && Value === user['custom:team_code']
      })
    })

    // 必要なメンバー情報のみ抽出
    const members = teamUsers?.map(async ({ Username = '', Attributes = [] }) => {
      return Attributes.reduce<Partial<UserInfo>>(
        (prev, { Name, Value = '' }) => {
          switch (Name) {
            case 'custom:team_code':
            case 'name':
            case 'given_name':
            case 'family_name':
            case 'custom:post':
            case 'custom:thumbnail_key':
              return { ...prev, [Name]: Value }
            default:
              return prev
          }
        },
        { 'cognito:username': Username }
      )
    })

    const res = await Promise.all(members)

    return res as UserInfo[]
  } catch (error) {
    console.error('Error fetching users:', error)
    return []
  }
}
