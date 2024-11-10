import { cookies } from 'next/headers'
import { cookieOption } from '@/src/utils/auth'

interface RequestData {
  idToken: string
  accessToken: string
}

export async function POST(req: Request) {
  const { idToken, accessToken }: RequestData = await req.json()

  const cookieStore = cookies()
  cookieStore.set('idToken', idToken, cookieOption)
  cookieStore.set('accessToken', accessToken, cookieOption)

  return new Response(JSON.stringify({ message: 'Token was set successfully' }))
}
