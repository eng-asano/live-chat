'use server'

import { Auth } from '@aws-amplify/auth'
import { cookies } from 'next/headers'
import { cookieOption } from '@/app/_utils/auth'

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
