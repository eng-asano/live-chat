import { MdLogout } from 'react-icons/md'
import { getUserInfo, getMembersInfo, signOut } from '@/src/actions/auth'
import { Profile, Members } from '@/src/components'
import { css } from '@/styled-system/css'
import { flex } from '@/styled-system/patterns'

interface Props {
  children: React.ReactNode
}

export default async function RoomsLayout({ children }: Readonly<Props>) {
  const user = await getUserInfo()
  const teamCode = user?.['custom:team_code']
  const userId = user?.['cognito:username']

  const members = await getMembersInfo()

  return (
    <div className={styles.root}>
      <div className={styles.side}>
        <header className={styles.header}>
          <h1 className={styles.title}>Live&thinsp;Chat</h1>
        </header>
        <Profile />
        <hr className={styles.separator_main} />
        <h2 className={styles.subTitle}>Members</h2>
        {teamCode && userId && <Members teamCode={teamCode} userId={userId} members={members} />}
        <form className={styles.form} action={signOut}>
          <hr className={styles.separator_sub} />
          <button className={styles.btn}>
            <MdLogout size={18} color="#fff" />
            Sign Out
          </button>
        </form>
      </div>
      {children}
    </div>
  )
}

const styles = {
  root: flex({}),
  side: flex({
    direction: 'column',
    shrink: '0',
    width: '320px',
    height: '100dvh',
    padding: '32px 32px 0',
    color: '#fff',
    background: 'background.main',
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
  separator_main: css({
    margin: '32px 0',
    borderColor: '#ececec',
  }),
  separator_sub: css({
    margin: '16px 0',
    borderColor: '#ececec',
  }),
  form: flex({
    flexDirection: 'column',
    justifyContent: 'center',
    margin: 'auto 0 20px',
  }),
  btn: flex({
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: '8px',
    height: '32px',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    borderRadius: '8px',
    _hover: {
      bgColor: 'primary.dark',
    },
    _focus: {
      bgColor: 'primary.dark',
      outline: 'none',
    },
  }),
}
