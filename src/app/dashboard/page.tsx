import { redirect } from 'next/navigation'
import { verifyIdToken, getUserInfo } from '@/src/actions/auth'
import { Messages, MessageInput } from '@/src/components'
import { css } from '@/styled-system/css'
import { flex } from '@/styled-system/patterns'

export default async function Rooms() {
  const res = await verifyIdToken()
  if (res.status === 'error') redirect('/sign-in')

  const user = await getUserInfo()
  const teamCode = user?.['custom:team_code']
  const userId = user?.['cognito:username']

  if (!teamCode || !userId) return <></>

  return (
    <div className={styles.root}>
      <Messages teamCode={teamCode} userId={userId} />
      <div className={styles.shadow}>
        <div className={styles.input}>
          <MessageInput teamCode={teamCode} userId={userId} />
        </div>
      </div>
    </div>
  )
}

const styles = {
  root: flex({
    position: 'relative',
    direction: 'column',
    justify: 'space-between',
    w: '100%',
    m: '0 auto',
  }),
  shadow: css({
    position: 'absolute',
    inset: 'auto 0 0 0',
    bgColor: '#fff',
    boxShadow: '6px 10px 16px',
    boxShadowColor: 'boxShadow.main',
  }),
  input: css({
    w: 'calc(100% - 64px)',
    maxW: '1280px',
    m: '0 auto',
    p: '24px 0',
  }),
}
