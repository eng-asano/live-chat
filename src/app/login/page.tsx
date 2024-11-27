import { redirect } from 'next/navigation'
import { verifyIdToken } from '@/src/actions/auth'
import { SignInForm, SocialSignIn } from '@/src/components'
import { css } from '@/styled-system/css'
import { flex } from '@/styled-system/patterns'
import { separator } from '@/styled-system/recipes'

export default async function Login() {
  const res = await verifyIdToken()
  if (res.status === 'success') redirect('/rooms')

  return (
    <div className={styles.root}>
      <section className={styles.login}>
        <div className={styles.heading}>
          <h1 className={styles.title}>Live&thinsp;Chat</h1>
        </div>
        <SignInForm />
        <div className={styles.other}>
          <div className={`${separator()} ${styles.or}`}>or</div>
          <SocialSignIn />
        </div>
      </section>
    </div>
  )
}

const styles = {
  root: flex({
    justify: 'center',
    align: 'center',
    h: '100%',
    bg: 'background.main',
  }),
  login: flex({
    direction: 'column',
    justify: 'center',
    rowGap: '40px',
    w: '480px',
    m: 'auto',
    p: '32px',
    bg: '#fff',
    borderRadius: '12px',
    boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.3)',
  }),
  heading: flex({
    justify: 'center',
    align: 'center',
    columnGap: '20px',
  }),
  title: css({
    fontFamily: 'fira',
    fontSize: '3rem',
    fontWeight: '700',
    textAlign: 'center',
    color: 'primary.main',
  }),
  other: flex({
    direction: 'column',
    align: 'center',
    rowGap: '16px',
  }),
  or: css({
    fontSize: '1.1rem',
  }),
}
