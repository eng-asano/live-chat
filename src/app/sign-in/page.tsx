import { redirect } from 'next/navigation'
import { verifyIdToken } from '@/src/actions/auth'
import { SignInForm } from '@/src/components'
import { css } from '@/styled-system/css'
import { flex } from '@/styled-system/patterns'
// import { separator } from '@/styled-system/recipes'

export default async function Login() {
  const res = await verifyIdToken()
  if (res.status === 'success') redirect('/dashboard')

  return (
    <div className={styles.root}>
      <section className={styles.login}>
        <div className={styles.heading}>
          <h1 className={styles.title}>Live&thinsp;Chat</h1>
        </div>
        <SignInForm />
        {/* <div className={styles.other}>
          <div className={`${separator()} ${styles.or}`}>or</div>
          <SocialSignIn />
        </div> */}
      </section>
    </div>
  )
}

const styles = {
  root: flex({
    justify: 'center',
    align: 'center',
    h: '100%',
    animation: 'fadeIn 0.5s ease-in',
  }),
  login: flex({
    direction: 'column',
    justify: 'center',
    rowGap: '36px',
    w: '100%',
    h: 'calc(100% - 48px)',
    minW: '320px',
    maxW: '480px',
    m: '0 24px',
    p: '32px',
    borderRadius: '12px',
  }),
  heading: flex({
    justify: 'center',
    align: 'center',
    columnGap: '20px',
    h: '40px',
  }),
  title: css({
    fontFamily: 'fira',
    fontSize: '3rem',
    fontWeight: '700',
    textAlign: 'center',
    color: 'white',
  }),
  // other: flex({
  //   direction: 'column',
  //   align: 'center',
  //   rowGap: '16px',
  // }),
  // or: css({
  //   fontSize: '1.1rem',
  // }),
}
