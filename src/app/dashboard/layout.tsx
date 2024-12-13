import { redirect } from 'next/navigation'
import { verifyIdToken, getUserInfo, getMembersInfo } from '@/src/actions/auth'
import { Profile, Members, Navigation } from '@/src/components'
import { css } from '@/styled-system/css'
import { flex } from '@/styled-system/patterns'

interface Props {
  children: React.ReactNode
}

export default async function RoomsLayout({ children }: Readonly<Props>) {
  const res = await verifyIdToken()

  if (res.status === 'error') redirect('/sign-in')

  const user = await getUserInfo()
  const teamCode = user?.['custom:team_code']
  const userId = user?.['cognito:username']

  if (!teamCode || !userId) return <></>

  const members = await getMembersInfo()

  return (
    <div className={styles.root}>
      <div className={styles.side}>
        <header className={styles.header}>
          <h1 className={styles.title}>Live&thinsp;Chat</h1>
        </header>
        <Profile />
        <hr className={styles.separator} />
        <h2 className={styles.subTitle}>Members</h2>
        <Members teamCode={teamCode} userId={userId} members={members} />
        <Navigation />
      </div>
      {children}
    </div>
  )
}

const styles = {
  root: flex({
    animation: 'fadeIn 0.5s ease-in',
  }),
  side: flex({
    direction: 'column',
    flexShrink: '0',
    w: '100%',
    minW: '320px',
    h: '100dvh',
    p: '32px 32px 0',
    color: '#fff',
    bg: 'background.main',

    sm: {
      flexShrink: '1',
    },
  }),
  header: flex({
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: '8px',
  }),
  title: css({
    fontFamily: 'fira',
    fontSize: '2rem',
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: '1.5rem',
  }),
  subTitle: css({
    fontSize: '1.2rem',
    fontWeight: 'bold',
  }),
  separator: css({
    margin: '24px 0',
    borderColor: '#ececec',
  }),
}
