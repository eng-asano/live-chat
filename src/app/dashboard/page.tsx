import { redirect } from 'next/navigation'
import { verifyIdToken, getUserInfo } from '@/src/actions/auth'
import { Chat } from '@/src/components'

export default async function Rooms() {
  const res = await verifyIdToken()
  if (res.status === 'error') redirect('/sign-in')

  const user = await getUserInfo()
  const teamCode = user?.['custom:team_code']
  const userId = user?.['cognito:username']

  if (!teamCode || !userId) return <></>

  return <Chat teamCode={teamCode} userId={userId} />
}
