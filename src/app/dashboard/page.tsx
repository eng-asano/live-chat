import { getUserInfo } from '@/src/actions/auth'
import { Chat } from '@/src/components'

export default async function Rooms() {
  const user = await getUserInfo()
  const teamCode = user?.['custom:team_code']
  const userId = user?.['cognito:username']

  if (!teamCode || !userId) return <></>

  return <Chat teamCode={teamCode} userId={userId} />
}
